import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      const all = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.status(200).json(all);
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
      }
      if (err instanceof ReferenceError) {
        return response.status(404).json({ error: err.message });
      }

      // return response.status(400).json({ error: err.message });
      return response.send();
    }
  }
}

export { ListAllUsersController };
