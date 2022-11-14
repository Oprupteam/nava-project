import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  titleEn?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }
FinanceMenuItems:Menu[]=[
  {
    headTitle: 'DASHBOARD',
 },
 {
  titleEn: 'Chart of Account',
  title: 'شجرة الحسابات',
  icon: 'home',
  type: 'link',
  active: true,
  path: '/ChartAccount'
},

]
  MENUITEMS: Menu[] = [
    {
      headTitle: 'DASHBOARD',
   },
    // {
    //   title: 'Dashboard',
    //   icon: 'home',
    //   type: 'sub',
    //   active: true,
    //   children: [
    //     { path: '/dashboard/dashboard01', title: 'Dashboard01', type: 'link' },
    //     { path: '/dashboard/dashboard02', title: 'Dashboard02', type: 'link' },
    //   ],
    // },

    // {
    //   titleEn: 'Inventory',
    //   title: 'المخزن',
    //   icon: 'home',
    //   type: 'sub',
    //   active: true,
    //   children: [
    //     { path: '/store/store', titleEn: 'Store',title: 'المستودع',  type: 'link' },
    //     { path: '/category/category', titleEn: 'Category',title: 'المجموعة',  type: 'link' },
    //     { path: '/Subcategory/Subcategory', titleEn: 'Subcategory',title: 'الفئة',  type: 'link' },
    //     { path: '/unit/unit', titleEn: 'Unit',title: 'الوحدة',  type: 'link' },
    //     { path: '/vendor/vendor', titleEn: 'Vendor', title: 'الموردون', type: 'link' },
    //     { path: '/items/items', titleEn: 'Items',title: 'مادة',  type: 'link' },

    //   ],
    // },
    // {
    //   titleEn: 'Purchase',
    //   title: 'المشتريات',
    //   icon: 'home',
    //   type: 'sub',
    //   active: true,
    //   children: [
    //     { path: '/itemRequest/itemRequest', titleEn:'Item Request',title:'طلب مادة',type:'link'},
    //     { path: '/LocalPurchaceOrder/LocalPurchaceOrder', titleEn:'Local Purchace Order',title:'طلب شراء محلي',type:'link'},
    //     { path: '/purchaseInvoices/purchaseInvoices', titleEn:'Purchase Invoices',title:'فاتورة المشتريات',type:'link'},


    //   ],
    // },
    // {
    //   titleEn: 'HR',
    //   title: ' الموارد البشرية',
    //   icon: 'home',
    //   type: 'sub',
    //   active: true,
    //   children: [
    //     { path: '/employee/view', titleEn: 'Employee',title: ' الموظفين',  type: 'link' },
    //     { path: '/sheet/sheet', titleEn: 'Time Sheet',title: ' الحضور والغياب',  type: 'link' },
    //     { path: '/advance/view', titleEn: 'Advances',title: 'السلف',  type: 'link' },


    //   ],
    // }

    // {
    //   title: 'Dashplex',
    //   icon: 'home',
    //   type: 'sub',
    //   active: true,
    //   children: [
    //     { path: '/dashboard/dashboard01', title: 'Dashboard - Dashboard01', type: 'link' },
    //     { path: '/dashboard/dashboard02', title: 'Dashboard - Dashboard02', type: 'link' },
    //     { path: '/eCommerce/dashboard', title: 'ECommerce - Dashboard', type: 'link' },
    //     { path: '/eCommerce/shop', title: 'ECommerce - Shop', type: 'link' },
    //     { path: '/eCommerce/product-details',title: 'ECommerce - Product Details', type: 'link' },
    //     { path: '/eCommerce/cart', title: 'ECommerce - Cart', type: 'link' },
    //     { path: '/eCommerce/checkout', title: 'ECommerce - Checkout', type: 'link' },
    //     { path: '/eCommerce/wishlist', title: 'ECommerce - Wishlist', type: 'link' },
    //     { path: '/eCommerce/add-products', title: 'ECommerce - Add Products', type: 'link' },
    //     { path: '/crypto-currencies/dashboard', title: 'Crypto - Dashboard', type: 'link' },
    //     { path: '/crypto-currencies/buy', title: 'Crypto - Buy & Sell', type: 'link'},
    //     { path: '/crypto-currencies/market-captial', title: 'Crypto - Market Captial', type: 'link' },
    //     { path: '/crypto-currencies/my-wallet', title: 'Crypto - My wallet', type: 'link' },
    //     { path: '/crypto-currencies/currency-exchange', title: 'Crypto - Currency exchange', type: 'link' },
    //     { path: '/elements/accordion', title: 'Elements - Accordion', type: 'link' },
    //     { path: '/elements/alerts', title: 'Elements - Alerts', type: 'link' },
    //     { path: '/elements/avatar', title: 'Elements - Avatar', type: 'link' },
    //     { path: '/elements/buttons', title: 'Elements - Buttons', type: 'link' },
    //     { path: '/elements/breadcrumbs', title: 'Elements - Brudcrumbs', type: 'link' },
    //     { path: '/elements/badges', title: 'Elements - Badges', type: 'link' },
    //     { path: '/elements/collpase', title: 'Elements - Collpase', type: 'link' },
    //     { path: '/elements/dropdown', title: 'Elements - Dropdown', type: 'link' },
    //     { path: '/elements/list-group', title: 'Elements - List Group', type: 'link' },
    //     { path: '/elements/media-object', title: 'Elements - Media Object', type: 'link' },
    //     { path: '/elements/modals', title: 'Elements - Modals', type: 'link' },
    //     { path: '/elements/navigation', title: 'Elements - Navigation', type: 'link' },
    //     { path: '/elements/pagination', title: 'Elements - Pagination', type: 'link' },
    //     { path: '/elements/popover', title: 'Elements - Popover', type: 'link' },
    //     { path: '/elements/progress', title: 'Elements - Progress', type: 'link' },
    //     { path: '/elements/spinners', title: 'Elements - Spinners', type: 'link' },
    //     { path: '/elements/thumbnails', title: 'Elements - Thumbnails', type: 'link' },
    //     { path: '/elements/typography', title: 'Elements - Typography', type: 'link' },
    //     { path: '/elements/tooltips', title: 'Elements - Tooltips', type: 'link' },
    //     { path: '/elements/toast', title: 'Elements - Toast', type: 'link' },
    //     { path: '/elements/tags', title: 'Elements - Tags', type: 'link' },
    //     { path: '/elements/tabs', title: 'Elements - Tabs', type: 'link' },
    //     { path: '/advanced-ui/cards', title: 'Advanced Ui - Cards', type: 'link' },
    //     { path: '/advanced-ui/carousel', title: 'Advanced Ui - Carousel', type: 'link' },
    //     { path: '/advanced-ui/chat', title: 'Advanced Ui - Chat', type: 'link' },
    //     { path: '/advanced-ui/contacts', title: 'Advanced Ui - Contacts', type: 'link' },
    //     { path: '/advanced-ui/calendar', title: 'Advanced Ui - Calendar', type: 'link' },
		//     { path: '/advanced-ui/draggable-cards', title: 'Advanced Ui - Draggable cards', type: 'link' },
		//     { path: '/advanced-ui/notifications', title: 'Advanced Ui - Notifications', type: 'link' },
		//     { path: '/advanced-ui/ratings', title: 'Advanced Ui - Ratings', type: 'link' },
		//     { path: '/advanced-ui/search', title: 'Advanced Ui - Search', type: 'link' },
    //     { path: '/advanced-ui/sweet-alerts', title: 'Advanced Ui - Sweet Alert', type: 'link'},
		//     { path: '/advanced-ui/timeline', title: 'Advanced Ui - Timeline', type: 'link' },
		//     { path: '/advanced-ui/treeview', title: 'Advanced Ui - Treeview', type: 'link' },
    //     { path: '/advanced-ui/userlist', title: 'Advanced Ui - Userlist', type: 'link' },
    //     { path: '/apps/widgets', title: 'Apps - Widgets', type: 'link' },
    //     { path: 'apps/maps/leaflet', title: 'Apps - Maps - Leaflet', type: 'link' },
    //     { path: 'apps/mail/mail-inbox', title: 'Apps - Mail Inbox', type: 'link' },
    //     { path: 'apps/mail/mail-compose', title: 'Apps - Mail Compose', type: 'link' },
    //     { path: 'apps/mail/view-mail', title: 'Apps - View Mail', type: 'link' },
    //     { path: 'apps/filemanager/file-attachments', title: 'Apps - File Attachments', type: 'link' },
    //     { path: 'apps/filemanager/file-details', title: 'Apps - File details', type: 'link' },
    //     { path: 'apps/filemanager/file-manager', title: 'Apps - File manager', type: 'link' },
    //     { path: 'apps/filemanager/file-managerlist', title: 'Apps - File managerlist', type: 'link' },
    //     { path: 'apps/blog/blog-details', title: 'Apps - Blog Details', type: 'link' },
    //     { path: 'apps/blog/blog-page', title: 'Apps - Blog Page', type: 'link' },
    //     { path: 'apps/blog/blog-post', title: 'Apps - Blog Post', type: 'link' },
    //     { path: '/icons/fontawsome', title: 'Icons - Font Awsome', type: 'link' },
    //     { path: '/icons/material-design-icons', title: 'Icons - Material Design Icons', type: 'link' },
    //     { path: '/icons/simple-line-icons',title: 'Icons - Simple Line Icons', type: 'link' },
    //     { path: '/icons/feather-icons', title: 'Icons - Feather Icons', type: 'link' },
    //     { path: '/icons/ionic-icons', title: 'Icons - Ionic Icons', type: 'link' },
    //     { path: '/icons/flag-icons', title: 'Icons - Flag Icons', type: 'link' },
    //     { path: '/icons/pe7-icons', title: 'Icons - Pe7 Icons', type: 'link' },
    //     { path: '/icons/themify-icons', title: 'Icons - Themify Icons', type: 'link' },
    //     { path: '/icons/tyicons', title: 'Icons - Typicons', type: 'link' },
    //     { path: '/icons/weather-icons', title: 'Icons - Weather Icons', type: 'link' },
    //     { path: '/icons/material-icons', title: 'Icons - Material Svgs', type: 'link' },
    //     { path: '/tables/default-tables', title: 'Tables - Default Table', type: 'link'},
    //     { path: '/tables/data-tables', title: 'Tables - Data Table', type: 'link' },
    //     { path: '/charts/apex-charts', title: 'Charts - apex-charts', type: 'link' },
    //     { path: '/charts/chartjs', title: 'Charts - chartjs-charts', type: 'link' },
    //     { path: '/charts/e-charts', title: 'Charts - Echarts', type: 'link' },
    //     { path: '/charts/chartlist', title: 'Charts - chartlist', type: 'link' },
    //     { path: '/forms/form-elements', title: 'Forms -  Form Elements', type: 'link' },
    //     { path: '/forms/advanced-forms', title: 'Forms -  Advanced Forms', type: 'link'},
    //     { path: '/forms/form-layouts', title: 'Forms -  Form Layouts', type: 'link' },
    //     { path: '/forms/form-validation', title: 'Forms -  Form Validations', type: 'link'},
    //     { path: '/forms/form-wizards', title: 'Forms -  Form Wizards', type: 'link' },
    //     { path: '/forms/form-editor', title: 'Forms -  Form Editor', type: 'link' },
    //     { path: '/forms/form-element-sizes', title: 'Forms -  Form Elements Sizes', type: 'link'},
    //     { path: '/custom-pages/sign-in', title: 'Pages - Sign In', type: 'link' },
    //     { path: '/custom-pages/sign-up', title: 'Pages - Sign Up', type: 'link' },
    //     { path: '/custom-pages/forget-password', title: 'Pages - Forget Password',type: 'link' },
    //     { path: '/custom-pages/reset-password', title: 'Pages - Reset Password', type: 'link', },
    //     { path: '/custom-pages/lockscreen', title: 'Pages - Lock Screen', type: 'link', },
    //     {path: '/custom-pages/under-construction',title: 'Pages - Under Construction',type: 'link',},
    //     {path: '/error-pages/error-404',title: 'Pages - Error 404',type: 'link',},
    //     {path: '/error-pages/error-500',title: 'Pages - Error 500',type: 'link',},
    //     { path: '', title: 'Submenu-1', type: 'empty' },
    //     { path: '', title: 'Submenu-2.1', type: 'empty' },
    //     { path: '', title: 'Submenu-2.2', type: 'empty' },
    //     { path: '/utilities/background', title: 'Utilities - Background', type: 'link' },
    //     { path: '/utilities/border', title: 'Utilities - Border', type: 'link' },
    //     { path: '/utilities/display', title: 'Utilities - Display', type: 'link' },
    //     { path: '/utilities/flex', title: 'Utilities - Flex', type: 'link' },
    //     { path: '/utilities/height', title: 'Utilities - Height', type: 'link' },
    //     { path: '/utilities/margin', title: 'Utilities - Margin', type: 'link' },
    //     { path: '/utilities/padding', title: 'Utilities - Padding', type: 'link' },
    //     { path: '/utilities/position', title: 'Utilities - Position', type: 'link' },
    //     { path: '/utilities/width', title: 'Utilities - Width', type: 'link' },
    //     { path: '/utilities/extras', title: 'Utilities - Extras', type: 'link' },

    //   ],
    // },
    ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

  Financeitems = new BehaviorSubject<Menu[]>(this.FinanceMenuItems);
}
