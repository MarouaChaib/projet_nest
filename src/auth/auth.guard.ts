import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate
 {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return !!request["user"]; // vérifie si l'objet de requête (request) contient une propriété user, ce qui indique que l'utilisateur est authentifié. Si request.user existe, la fonction retourne true, permettant ainsi l'accès à la route protégée. Sinon, elle retourne false, bloquant l'accès.
  }
}
