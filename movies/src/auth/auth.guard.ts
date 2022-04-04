import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log(request);
        return this.validateToken(request);
    }


    validateToken(request){
        // TODO validate the token, send user info in header
        const token = request.headers['Authentication'];
        console.log(token)
        return true;
    }
}