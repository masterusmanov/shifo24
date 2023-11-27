import {
  Body,
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { S3Service } from 'src/utils/s3.util';
import { AuthService } from './auth.service';
import {
  ClientInfoDto,
  LoginDto,
  RegisterPhoneDto,
  SignUpDto,
} from './dtos/register.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserPayload } from 'src/dtos/userPayload.dto';
import {
  CreateClientSwagger,
  CreateDoctorSwagger,
} from './dtos/swagger/swagger.decorator';
import { UserDto } from './dtos/user.dto';
import { imageFileFilter } from 'src/utils/file-interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly s3: S3Service,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterPhoneDto) {
    return this.authService.register(data);
  }

  @Post('resend-otp')
  async resendCode(@Body() data: RegisterPhoneDto) {
    return this.authService.resendCode(data);
  }

  @Post('check-phone')
  async checkPhone(@Body() data: RegisterPhoneDto) {
    return this.authService.checkPhone(data);
  }

  @Post('confirm')
  async confirm(@Body() data: SignUpDto) {
    return this.authService.confirm(data);
  }

  @Post('login')
  async login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  @UseGuards(AuthenticationGuard)
  @CreateDoctorSwagger()
  @Post('doctor-info')
  async doctorInfo(@CurrentUser() user: UserPayload, @Body() data: UserDto) {
    return this.authService.doctorInfo(user.id, data);
  }

  @UseGuards(AuthenticationGuard)
  @CreateClientSwagger()
  @Post('client-info')
  async clientInfo(
    @CurrentUser() user: UserPayload,
    @Body() data: ClientInfoDto,
  ) {
    return this.authService.clientInfo(user.id, data);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @Req() req: any,
    @UploadedFiles()
    files: // new ParseFilePipe({
    //   validators: [
    //     new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ }), // (png|jpeg|jpg|txt|pdf)
    //     new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
    //   ],
    // }),
    Array<Express.Multer.File>,
  ) {
    if (files?.length < 1 || req.fileValidationError) {
      throw new BadRequestException(
        `Invalid file type! ${req.fileValidationError}`,
      );
    }
    return await this.s3.s3_upload(files);
  }
}
