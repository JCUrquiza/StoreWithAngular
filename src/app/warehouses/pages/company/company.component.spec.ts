import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CompanyComponent } from "./company.component";
import { CompanyService } from "../../services/company.service";


describe('CompanyComponent', () => {

  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let mockCompanyService: any;

  beforeEach(async () => {
    // Crear un mock para el CompanyService
    mockCompanyService = jasmine.createSpyObj(['showActionOFCrudCompany']);

    await TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      providers: [
        { provide: CompanyService, useValue: mockCompanyService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectAction and set actionOfCrudFromService', () => {
    // Configurar el mock para que devuelva un valor específico
    const mockAction = { create: true, read: true };
    mockCompanyService.showActionOFCrudCompany.and.returnValue(mockAction);

    // Llamar a la función selectAction
    component.selectAction('read');

    // Verificar que el servicio fue llamado con el parámetro correcto
    expect(mockCompanyService.showActionOFCrudCompany).toHaveBeenCalledWith('read');
    // Verificar que actionOfCrudFromService se actualizó correctamente
    expect(component.actionOfCrudFromService).toEqual(mockAction);
  });

});

