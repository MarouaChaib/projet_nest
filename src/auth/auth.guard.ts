import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Implementation for authentication logic
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return !!request['user']; // Return true if user is authenticated, false otherwise

    }
}