import {Module} from '@nestjs/common';
import {AuthGuard} from "./auth.guard";
import {JwtModule, JwtService} from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({secret: process.env.JWT_SECRET})
    ],
    providers: [AuthGuard],
    exports: [AuthGuard, JwtModule]
})
export class AuthModule {
}
