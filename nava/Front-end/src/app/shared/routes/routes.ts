import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'eCommerce',
    loadChildren: () => import('../../components/ecommerce/ecommerce.module').then(m => m.ECommerceModule)
  },
  {
    path: 'crypto-currencies',
    loadChildren: () => import('../../components/crypto-currencies/crypto-currencies.module').then(m => m.CryptoCurrenciesModule)
  },
  {
    path: 'elements',
    loadChildren: () => import('../../components/elements/elements.module').then(m => m.ElementsModule)
  },
  {
    path: 'advanced-ui',
    loadChildren: () => import('../../components/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('../../components/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../components/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'icons',
    loadChildren: () => import('../../components/icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('../../components/forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../../components/chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'utilities',
    loadChildren: () => import('../../components/utilities/utilities.module').then(m => m.UtilitiesModule)
  },
  // {
  //   path: 'bank',
  //   loadChildren: () => import('../../hr/bank/bank.module').then(m => m.BankModule)
  // },
  // {
  //   path: 'insurance-company',
  //   loadChildren: () => import('../../hr/insurance-company/insurance-company.module').then(m => m.InsuranceCompanyModule)
  // },
  // {
  //   path: 'major',
  //   loadChildren: () => import('../../hr/major/major.module').then(m => m.MajorModule)
  // },
  // {
  //   path: 'top-management',
  //   loadChildren: () => import('../../hr/top-management/top-management.module').then(m => m.TopManagementModule)
  // },
  // {
  //   path: 'salary-object',
  //   loadChildren: () => import('../../hr/salary-object/salary-object.module').then(m => m.SalaryObjectModule)
  // },
  // {
  //   path: 'qualification',
  //   loadChildren: () => import('../../hr/qualification/qualification.module').then(m => m.QualificationModule)
  // },
  // {
  //   path: 'university',
  //   loadChildren: () => import('../../hr/university/university.module').then(m => m.UniversityModule)
  // },
  // {
  //   path: 'company',
  //   loadChildren: () => import('../../hr/company/company.module').then(m => m.CompanyModule)

  // }, {
  //   path: 'store',
  //   loadChildren: () => import('../../inventory/store/store.module').then(m => m.StoreModule)
  // }
  // ,
  // {
  //   path: 'category',
  //   loadChildren: () => import('../../inventory/category/category.module').then(m => m.CategoryModule)
  // }
  // ,
  // {
  //   path: 'items',
  //   loadChildren: () => import('../../inventory/items/items.module').then(m => m.ItemsModule)
  // }
  // ,
  // {
  //   path: 'Subcategory',
  //   loadChildren: () => import('../../inventory/sub-category/sub-category.module').then(m => m.SubCategoryModule)
  // }
  // ,
  // {
  //   path: 'unit',
  //   loadChildren: () => import('../../inventory/unit/unit.module').then(m => m.UnitModule)
  // }
  // ,
  // {
  //   path: 'vendor',
  //   loadChildren: () => import('../../inventory/vendor/vendor.module').then(m => m.VendorModule)

  // },
  // {
  //   path: 'management',
  //   loadChildren: () => import('../../hr/management/management.module').then(m => m.ManagementModule)

  // },
  // {
  //   path: 'employee',
  //   loadChildren: () => import('../../hr/employee/employee.module').then(m => m.EmployeeModule)

  // },
  // {
  //   path: 'employee-type',
  //   loadChildren: () => import('../../hr/employee-type/employee-type.module').then(m => m.EmployeeTypeModule)
  // },
  // {
  //   path: 'itemRequest',
  //   loadChildren: () => import('../../purchase/item-request/itemRrequest.module').then(m => m.ItemRequestModule)
  // },
  // {
  //   path: 'department',
  //   loadChildren: () => import('../../hr/department/department.module').then(m => m.DepartmentModule)
  // },
  // {
  //   path: 'section',
  //   loadChildren: () => import('../../hr/section/section.module').then(m => m.SectionModule)
  // },
  // {
  //   path: 'job-title',
  //   loadChildren: () => import('../../hr/job-title/job-title.module').then(m => m.JobTitleModule)
  // },
  // {
  //   path: 'vacation',
  //   loadChildren: () => import('../../hr/vacation/vacation.module').then(m => m.VacationModule)
  // },
  // {
  //   path: 'leaves',
  //   loadChildren: () => import('../../hr/leaves/leaves.module').then(m => m.LeavesModule)
  // },
  // {
  //   path: 'benefit',
  //   loadChildren: () => import('../../hr/benefit/benefit.module').then(m => m.BenefitModule)
  // },
  // {
  //   path: 'LocalPurchaceOrder',
  //   loadChildren: () => import('../../purchase/local-purchace-order/local-purchace-order.module').then(m => m.LocalPurchaceOrderModule)
  // },
  // {
  //   path: 'sheet',
  //   loadChildren: () => import('../../hr/time-sheet/time-sheet.module').then(m => m.TimeSheetModule)
  // },






  // {
  //   path: 'advance',
  //   loadChildren: () => import('../../hr/advance/advance.module').then(m => m.AdvanceModule)
  // },
  // {
  //   path: 'ChartAccount',
  //   loadChildren: () => import('../../finance/finance.module').then(m => m.FinanceModule)
  // },
  // {
  //   path: 'purchaseInvoices',
  //   loadChildren: () => import('../../purchase/purchase-invoices/purchase-invoices.module').then(m => m.PurchaseInvoicesModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
  // },

];
