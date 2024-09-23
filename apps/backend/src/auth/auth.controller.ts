import { Body, Controller, HttpException, Post, Put } from '@nestjs/common';
import { Usuario } from '@barbabrutal/core';
import { UsuarioRepositorio } from './usuario.repositorio';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioRepositorio) {}

  @Post('login')
  async login() {
    // Implement login logic here
    return 'login';
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new HttpException('Usuário já existe', 400);
    }

    await this.repo.salvar(usuario);
  }

  @Put('alterar')
  async alterar(@Body() usuario: Usuario) {
    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (!usuarioExistente) {
      throw new HttpException('Usuário não existe', 400);
    }

    // No registro de usuário, não permite cadastrar barbeiros
    await this.repo.salvar({ ...usuario, barbeiro: false });
  }
}
