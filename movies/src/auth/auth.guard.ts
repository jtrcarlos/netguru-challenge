import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateToken(request);
    }


    validateToken(request) {
        const authHeader = request.headers['authorization'];
        let token;

        if (!authHeader) return false;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        try {
            const decodedToken = this.jwtService.verify(token);

            request.user = {...decodedToken};
        } catch (error) {
            throw new UnauthorizedException(error);
        }

        return true;
    }
}