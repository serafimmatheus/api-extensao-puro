import { RecursosRepositoryIProps } from "@/repositories/recursos.repository";
import { Prisma } from "@prisma/client";

export class RecursosServices {
  constructor(private recursosRepository: RecursosRepositoryIProps) {}

  all = async () => {
    return await this.recursosRepository.all();
  };

  create = async (data: any) => {
    return await this.recursosRepository.createMany(data);
  };

  createOne = async (data: Prisma.RecursoCreateInput) => {
    return await this.recursosRepository.create(data);
  };

  updated = async (id: string, data: Prisma.RecursoCreateInput) => {
    return await this.recursosRepository.updated(id, data);
  };

  deleted = async (id: string) => {
    return await this.recursosRepository.deleted(id);
  };
}
