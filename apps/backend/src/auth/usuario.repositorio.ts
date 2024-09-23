import { Injectable } from '@nestjs/common';
import { Usuario} from "@barbabrutal/core";
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsuarioRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.upsert({
      where: { id: usuario.id ?? -1 },
      update: usuario,
      create: usuario as any,
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }
}
