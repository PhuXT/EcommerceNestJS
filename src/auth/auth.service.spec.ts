import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from 'src/emails/emails.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let athService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let emailService: EmailsService;

  const MockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    regisrer: jest.fn,
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, EmailsService],
    })
      .overrideProvider(UsersService)
      .useValue(MockAuthService)
      .compile();

    athService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(athService).toBeDefined();
  });

  describe('login', () => {
    it('[Expect-success] Should call service to login', async () => {
      // MockAuthService.login.mockResolvedValue(true);
      // const result = await athService.login({
      //   user: { email: 'Phamphu040411@gmail.com', password: 'Phu123456' },
      // });
      // expect(result).toBe(true);
    });
  });
});
