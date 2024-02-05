import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';

describe('AppController', () => {
  let homeController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    homeController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(homeController.getHello()).toBe('Hello World!');
    });
  });
});
