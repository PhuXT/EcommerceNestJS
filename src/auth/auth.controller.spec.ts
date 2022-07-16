import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authcontroller: AuthController;

  const MockAuthController = {
    login: jest.fn(),
    regisrer: jest.fn(),
    verify: jest.fn(() => 'Account actived'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthController)
      .compile();

    authcontroller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authcontroller).toBeDefined();
  });

  describe('login', () => {
    it('[Expect-success] Should call service to login', async () => {
      MockAuthController.login.mockResolvedValue(true);
      const result = await authcontroller.login({
        user: { email: 'Phamphu040411@gmail.com', password: 'Phu123456' },
      });
      expect(result).toBe(true);
    });
  });

  describe('register', () => {
    it('[Expect-success] Should active a account', async () => {
      MockAuthController.regisrer.mockResolvedValue(true);
      const userRegister = {
        userName: 'Pham Van Phu',
        email: 'Phamphu040413@gmail.com',
        password: 'Phamvanphu123',
        phone: '012679999',
        address: 'Nam Dinh',
      };
      expect(await authcontroller.create(userRegister)).toBe(true);
    });
  });

  describe('verify', () => {
    it('[Expect-success] Should active a account', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBoYW0gVmFuIFBodSIsImlkIjoiNjJjZmQzNzMyZjlkMTRjZTA2NTg5MDhlIiwiaWF0IjoxNjU3Nzg3MjUxLCJleHAiOjE2NTc4NzM2NTF9.qdOmy6sYvTmxyTMYeyO7j6Z85W8YWmp-jYLfVLoSwFk';
      const result = await authcontroller.verify(token);
      expect(result).toBe('Account actived');
    });
  });
});
