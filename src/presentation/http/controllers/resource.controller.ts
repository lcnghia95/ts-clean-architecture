import { NextFunction, Request, Response } from 'express';
import { ResourceMapper, ResourceRepoImpl } from '../../../infrastructure';
import { IResourceRepository } from '../../../domain';
import { ResourceService } from '../../../application';

const resourceMapper = new ResourceMapper();
const resourceRepository: IResourceRepository = new ResourceRepoImpl(resourceMapper);
const resourceService = new ResourceService(resourceRepository);

export class ResourceController {
  static async createResource(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, description } = req.body;
      const response = await resourceService.createResource(name, description);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateResource(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const response = await resourceService.updateResource(id, name, description);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteResource(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const response = await resourceService.deleteResource(id);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getResource(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const response = await resourceService.getResource(id);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getResources(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const filters = {
        name: req.query.name as string,
        description: req.query.description as string,
      };

      const response = await resourceService.getResources(page, limit, filters);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
