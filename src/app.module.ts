import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { DatabaseModule } from './database/database.module'
import { NotesModule } from './notes/notes.module'
import { TagsModule } from './tags/tags.module'
import { ThemesModule } from './themes/themes.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TagsModule,
    ThemesModule,
    NotesModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/auth/login', method: RequestMethod.POST })
      .forRoutes('*')
  }
}
