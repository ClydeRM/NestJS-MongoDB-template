import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserDto } from './Dto/user.dto';

const testUserId1 = 'a uuid 1';
const testGoogleId1 = 'a googleId 1'; // Google ID OAuth20
const testDisplayName1 = '王小明';
const testFirstName1 = '小明';
const testLastName1 = '王';
const testImage1 = 'a google picture url';
const testCreateAt = new Date(Date.now());

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                userId: testUserId1,
                googleId: testGoogleId1,
                displayName: testDisplayName1,
                firstName: testFirstName1,
                lastName: testLastName1,
                image: testImage1,
                createdAt: testCreateAt,
              },
              {
                userId: 'a uuid 2',
                googleId: 'a googleId 2',
                displayName: '王大明',
                firstName: '大明',
                lastName: '王',
                image: 'a google picture url',
                createdAt: testCreateAt,
              },
            ]),

            getOne: jest.fn().mockImplementation((userId: string) =>
              Promise.resolve({
                userId: userId,
                googleId: testGoogleId1,
                displayName: testDisplayName1,
                firstName: testFirstName1,
                lastName: testLastName1,
                image: testImage1,
                createdAt: testCreateAt,
              }),
            ),

            createOne: jest.fn().mockImplementation((user: UserDto) =>
              Promise.resolve({
                ...user,
              }),
            ),

            updateOne: jest
              .fn()
              .mockImplementation((userId: string, user: UserDto) =>
                Promise.resolve({ userId: 'a uuid 1', ...user }),
              ),

            deleteOne: jest.fn().mockResolvedValue((userId: string) =>
              Promise.resolve({
                deleted: true,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should get an array of users', () => {
      expect(controller.getUsers()).resolves.toEqual([
        {
          userId: testUserId1,
          googleId: testGoogleId1,
          displayName: testDisplayName1,
          firstName: testFirstName1,
          lastName: testLastName1,
          image: testImage1,
          createdAt: testCreateAt,
        },
        {
          userId: 'a uuid 2',
          googleId: 'a googleId 2',
          displayName: '王大明',
          firstName: '大明',
          lastName: '王',
          image: 'a google picture url',
          createdAt: testCreateAt,
        },
      ]);
    });
  });

  describe('getByUserId', () => {
    it('should get a single user', () => {
      expect(controller.getUserById('a uuid 1')).resolves.toEqual({
        userId: 'a uuid 1',
        googleId: testGoogleId1,
        displayName: testDisplayName1,
        firstName: testFirstName1,
        lastName: testLastName1,
        image: testImage1,
        createdAt: testCreateAt,
      });
    });
  });

  describe('Create New User', () => {
    it('should create a new user', () => {
      const newUserDto: UserDto = {
        googleId: 'a new googleId',
        displayName: '陳小寶',
        firstName: '小寶',
        lastName: '陳',
        image: testImage1,
      };
      expect(controller.CreateUser(newUserDto)).resolves.toEqual({
        ...newUserDto,
      });
    });
  });

  describe('updateUser', () => {
    it('should update a new user', () => {
      const userId = 'a uuid 1';
      const newUserDto: UserDto = {
        googleId: testGoogleId1,
        displayName: '王小小明',
        firstName: '小小明',
        lastName: '王',
        image: testImage1,
        createdAt: testCreateAt,
      };
      expect(controller.updateUser(userId, newUserDto)).resolves.toEqual({
        ...newUserDto,
        userId: userId,
      });
    });
  });

  describe('deleteUser', () => {
    it('should return that it deleted a user', () => {
      expect(controller.deleteUser('a uuid 1')).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a user', () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteOne')
        .mockResolvedValueOnce({ deleted: false });
      expect(
        controller.deleteUser('a uuid that does not exist'),
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });
});
