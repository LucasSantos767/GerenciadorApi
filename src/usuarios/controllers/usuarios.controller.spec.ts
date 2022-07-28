import { Role } from './../../auth/model/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../service/usuarios.service';
import { User } from '../model/user.model';

const UserList: User[] = [
    new User({ name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.ADMIN }),
    new User({ name: 'User', email: 'user@gmail.com', password: 'User123@', role: Role.USER }),
    new User({ name: 'Lucas', email: 'lucas@gmail.com', password: 'Lucas123@', role: Role.ADMIN })

]

describe('TesteController', () => {
    let usuarioscontroller: UsuariosController;
    let usuariosService: UsuariosService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [{
                provide: UsuariosService,
                useValue: {
                    create: jest.fn(),
                    findAll: jest.fn().mockResolvedValue(UserList),
                    findByEmail: jest.fn(),
                    update: jest.fn(),
                    remove: jest.fn()
                }
            }],
        }).compile();

        usuarioscontroller = module.get<UsuariosController>(UsuariosController);
        usuariosService = module.get<UsuariosService>(UsuariosService);

    });

    it('should be defined', () => {
        expect(usuarioscontroller).toBeDefined();
        expect(usuariosService).toBeDefined();
    });
    describe('findAll', () => {
        it('deve retornar uma lista de usuários com sucesso', async () => {
              const result = await usuarioscontroller.findAll();

            expect(result).toEqual(UserList);
            expect(typeof result).toEqual('object');
            expect(usuariosService.findAll).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção',()=>{
            jest.spyOn(usuariosService,'findAll').mockRejectedValueOnce(new Error());

            expect(usuarioscontroller.findAll()).rejects.toThrowError();
        });
    });
});