'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { formatVND } from '../../domain/pricing';
import { OrderStatus } from '../../domain/types';

interface SavedAddress {
  id: string;
  label: string;
  isDefault: boolean;
  recipientName: string;
  phone: string;
  address: string;
  city: string;
  deliveryWindow: string;
  notes: string;
}

interface VatInvoiceItem {
  id: string;
  invoiceNumber: string;
  symbol: string;
  issueDate: string;
  orderCode: string;
  orderItemsSummary: string;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
  cqtCode: string;
  buyerName: string;
  buyerCompany: string;
  buyerTaxCode: string;
  buyerAddress: string;
  status: 'valid' | 'pending';
}

const INITIAL_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Trụ sở chính Tập Đoàn - Hà Nội',
    isDefault: true,
    recipientName: 'Nguyễn Văn A (Trưởng phòng Thu Mua)',
    phone: '0912 345 678',
    address: 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên',
    city: 'Hà Nội',
    deliveryWindow: '18/01 - 20/01/2027 (Trước 23 Tháng Chạp)',
    notes: 'Giao giờ hành chính, liên hệ trước 30 phút, bàn giao tại sảnh lễ tân tầng 1.',
  },
  {
    id: 'addr-2',
    label: 'Chi nhánh Miền Nam - TP. Hồ Chí Minh',
    isDefault: false,
    recipientName: 'Trần Thị Thu Hà (Giám đốc Văn phòng đại diện)',
    phone: '0908 776 543',
    address: 'Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Quận 1',
    city: 'TP. Hồ Chí Minh',
    deliveryWindow: '21/01/2027 (Giao hẹn giờ 09:00 - 11:30)',
    notes: 'Liên hệ trước khi qua cổng an ninh, yêu cầu đồng kiểm niêm phong từng kiện.',
  },
  {
    id: 'addr-3',
    label: 'Văn phòng Đại diện Miền Trung - Đà Nẵng',
    isDefault: false,
    recipientName: 'Lê Hoàng Nam (Phụ trách Hành chính)',
    phone: '0935 123 987',
    address: 'Tòa nhà Indochina Riverside, 74 Bạch Đằng, Q. Hải Châu',
    city: 'Đà Nẵng',
    deliveryWindow: '22/01/2027',
    notes: 'Giao kèm 15 túi quà gấm và phong bì thiệp Tết Ban Lãnh Đạo.',
  },
  {
    id: 'addr-4',
    label: 'Trung tâm Phân phối & Kho Logistics - Bình Dương',
    isDefault: false,
    recipientName: 'Phạm Quốc Cường (Quản lý kho vận)',
    phone: '0987 654 321',
    address: 'KCN VSIP 1, Đại lộ Hữu Nghị, TP. Thuận An',
    city: 'Bình Dương',
    deliveryWindow: '19/01/2027 (Ca sáng)',
    notes: 'Xe tải giao cổng số 2, pallet bọc màng co bảo vệ nhiệt độ phòng.',
  },
];

const INITIAL_INVOICES: VatInvoiceItem[] = [
  {
    id: 'inv-1',
    invoiceNumber: '0008821',
    symbol: '1C27TEG',
    issueDate: '18/01/2027',
    orderCode: '#EG-882027',
    orderItemsSummary: '50 Set Hộp Gỗ Sơn Mài "Vạn Sự Khởi Sắc" Đinh Mùi 2027',
    subtotal: 58000000,
    vatRate: 8,
    vatAmount: 4640000,
    grandTotal: 62640000,
    cqtCode: '0049281938210382',
    buyerName: 'Nguyễn Văn A',
    buyerCompany: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP',
    buyerTaxCode: '0101245486',
    buyerAddress: 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên, TP. Hà Nội',
    status: 'valid',
  },
  {
    id: 'inv-2',
    invoiceNumber: '0008819',
    symbol: '1C27TEG',
    issueDate: '15/01/2027',
    orderCode: '#EG-881945',
    orderItemsSummary: '30 Set Rương Gỗ Tự Nhiên "Long Phụng Hòa Minh" Thượng Hạng',
    subtotal: 68400000,
    vatRate: 8,
    vatAmount: 5472000,
    grandTotal: 73872000,
    cqtCode: '0049281938210378',
    buyerName: 'Nguyễn Văn A',
    buyerCompany: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP',
    buyerTaxCode: '0101245486',
    buyerAddress: 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên, TP. Hà Nội',
    status: 'valid',
  },
  {
    id: 'inv-3',
    invoiceNumber: '0008740',
    symbol: '1C27TEG',
    issueDate: '10/01/2027',
    orderCode: '#EG-880211',
    orderItemsSummary: '25 Set Hộp Gỗ Sơn Mài "Khai Xuân Đắc Lộc" Dát Vàng',
    subtotal: 57000000,
    vatRate: 8,
    vatAmount: 4560000,
    grandTotal: 61560000,
    cqtCode: '0049281938210312',
    buyerName: 'Nguyễn Văn A',
    buyerCompany: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP',
    buyerTaxCode: '0101245486',
    buyerAddress: 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên, TP. Hà Nội',
    status: 'valid',
  },
];

export const AccountView: React.FC = () => {
  const { orders, navigateTo, showToast, currentUser, updateUserProfile, logout } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'invoices'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderModal, setSelectedOrderModal] = useState<string | null>(null);

  // Profile & Corporate State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Nguyễn Văn A',
    email: currentUser?.email || 'van.a@vingroup.net',
    phone: currentUser?.phone || '0912 345 678',
    position: currentUser?.position || 'Quản lý thu mua cấp cao & Chuỗi cung ứng',
    companyName: currentUser?.companyName || 'Tập Đoàn Vingroup - Công Ty CP',
    taxCode: currentUser?.taxCode || '0101245486',
    address: currentUser?.address || 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên',
    city: currentUser?.city || 'Hà Nội',
    bankAccount: '1903 8291 0290 18 - Techcombank Chi nhánh Hoàn Kiếm',
    legalRepresentative: 'Ông Nguyễn Việt Quang - Tổng Giám Đốc kiêm Phó Chủ Tịch',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: '',
    recipientName: '',
    phone: '',
    address: '',
    city: 'Hà Nội',
    deliveryWindow: 'Trước 23 Tháng Chạp',
    notes: '',
    isDefault: false,
  });

  // Excel Batch Import Modal
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [excelSimulated, setExcelSimulated] = useState(false);

  // Invoices State
  const [invoices] = useState<VatInvoiceItem[]>(INITIAL_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<VatInvoiceItem | null>(null);
  const [defaultVatInfo, setDefaultVatInfo] = useState({
    companyName: 'TẬP ĐOÀN VINGROUP - CÔNG TY CP',
    taxCode: '0101245486',
    address: 'Tòa tháp Symphony, Chu Huy Mân, P. Phúc Lợi, Q. Long Biên, TP. Hà Nội',
    email: 'ketoan.hoadon@vingroup.net',
  });
  const [isEditingDefaultVat, setIsEditingDefaultVat] = useState(false);

  if (!currentUser) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-gradient-to-b from-[#3a0a0e] to-[#1e0507] border border-amber-500/30 gold-card-shadow">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl mx-auto shadow-inner">
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-serif-tet text-white">
              Cần Đăng Nhập Tài Khoản
            </h2>
            <p className="text-xs text-amber-100/75 leading-relaxed">
              Quý khách vui lòng đăng nhập hoặc tạo tài khoản mới để theo dõi tiến độ đơn quà Tết, quản lý sổ địa chỉ chi nhánh và tra cứu hóa đơn điện tử GTGT.
            </p>
          </div>
          <button
            onClick={() => navigateTo('auth')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            Đăng Nhập / Đăng Ký Ngay ➔
          </button>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter === 'all') return true;
    return ord.status === statusFilter;
  });

  const getStatusCount = (status: OrderStatus | 'all') => {
    if (status === 'all') return orders.length;
    return orders.filter((o) => o.status === status).length;
  };

  const handleDownloadInvoice = (orderCode: string) => {
    showToast(`Đang tải hóa đơn điện tử GTGT hợp lệ 8% cho đơn ${orderCode}...`, 'info');
  };

  const handleReorder = (orderCode: string) => {
    showToast(`Đã nhân bản toàn bộ cấu hình đơn ${orderCode} vào giỏ hàng Tết!`, 'success');
    navigateTo('cart');
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      position: profileForm.position,
      companyName: profileForm.companyName,
      taxCode: profileForm.taxCode,
      address: profileForm.address,
      city: profileForm.city,
    });
    showToast('Đã lưu và xác thực thông tin hồ sơ doanh nghiệp thành công!', 'success');
  };

  // Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      showToast('Vui lòng nhập mật khẩu hiện tại.', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('Mật khẩu mới phải có tối thiểu 6 ký tự.', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Xác nhận mật khẩu mới không trùng khớp.', 'error');
      return;
    }
    showToast('Đổi mật khẩu tài khoản thành công!', 'success');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Address Actions
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: '',
      recipientName: '',
      phone: '',
      address: '',
      city: 'Hà Nội',
      deliveryWindow: 'Trước 23 Tháng Chạp',
      notes: '',
      isDefault: false,
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: SavedAddress) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      label: addr.label,
      recipientName: addr.recipientName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      deliveryWindow: addr.deliveryWindow,
      notes: addr.notes,
      isDefault: addr.isDefault,
    });
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.label || !addressForm.recipientName || !addressForm.phone || !addressForm.address) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc.', 'error');
      return;
    }

    if (editingAddressId) {
      setSavedAddresses((prev) =>
        prev.map((item) => {
          if (item.id === editingAddressId) {
            return {
              ...item,
              ...addressForm,
              isDefault: addressForm.isDefault,
            };
          }
          return addressForm.isDefault ? { ...item, isDefault: false } : item;
        })
      );
      showToast(`Đã cập nhật địa chỉ "${addressForm.label}"!`, 'success');
    } else {
      const newAddr: SavedAddress = {
        id: `addr-${Date.now()}`,
        ...addressForm,
      };
      setSavedAddresses((prev) => {
        if (addressForm.isDefault) {
          return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
        }
        return [...prev, newAddr];
      });
      showToast(`Đã thêm địa chỉ giao nhận "${addressForm.label}" vào sổ!`, 'success');
    }
    setAddressModalOpen(false);
  };

  const handleSetDefaultAddress = (id: string) => {
    setSavedAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
    showToast('Đã đặt làm địa chỉ nhận quà mặc định.', 'success');
  };

  const handleDeleteAddress = (id: string, label: string) => {
    if (confirm(`Quý khách có chắc chắn muốn xóa địa chỉ "${label}" khỏi sổ giao hàng?`)) {
      setSavedAddresses((prev) => prev.filter((item) => item.id !== id));
      showToast(`Đã xóa địa chỉ "${label}".`, 'info');
    }
  };

  const handleDownloadSampleExcel = () => {
    showToast('Đang tải file mẫu: "Mau_Danh_Sach_Phan_Bo_Qua_Tet_2027.xlsx"...', 'info');
  };

  const handleSimulateExcelImport = () => {
    setExcelSimulated(true);
    setTimeout(() => {
      const importedMock: SavedAddress[] = [
        {
          id: `addr-batch-1`,
          label: 'Chi nhánh Hải Phòng - Văn phòng Cảng',
          isDefault: false,
          recipientName: 'Đặng Tuấn Kiệt (Phó GĐ Vận hành)',
          phone: '0904 999 888',
          address: 'Tòa nhà TD Plaza, Lê Hồng Phong, Q. Ngô Quyền',
          city: 'Hải Phòng',
          deliveryWindow: '20/01/2027',
          notes: 'Giao giờ hành chính, kèm 20 phong bao lì xì Đinh Mùi.',
        },
        {
          id: `addr-batch-2`,
          label: 'Văn phòng Đại diện Cần Thơ - Đồng Bằng Sông Cửu Long',
          isDefault: false,
          recipientName: 'Vũ Bích Hạnh (Trưởng đại diện Tây Nam Bộ)',
          phone: '0979 333 444',
          address: 'Vincom Plaza Xuân Khánh, 209 Đường 30/4, Ninh Kiều',
          city: 'Cần Thơ',
          deliveryWindow: '21/01/2027',
          notes: 'Kiểm đếm hộp quà sơn mài và thiệp chúc lãnh đạo.',
        },
      ];
      setSavedAddresses((prev) => [...prev, ...importedMock]);
      setExcelModalOpen(false);
      setExcelSimulated(false);
      showToast('Đã trích xuất & nạp thành công 2 địa chỉ chi nhánh từ file Excel!', 'success');
    }, 900);
  };

  return (
    <div className="w-full">
      {/* Top Hero Breadcrumb */}
      <section
        className="relative bg-gradient-to-b from-[#5c0b11] via-[#750e17] to-[#4a080c] overflow-hidden pt-8 pb-12 border-b border-amber-600/20"
        style={{
          background:
            'linear-gradient(rgba(61, 10, 11, 0.9) 0%, rgba(38, 6, 7, 0.8) 60%, transparent 100%)',
          borderBottomColor: 'rgba(245, 158, 11, 0.2)',
        }}
      >
        <div className="absolute inset-0 radial-lantern-glow pointer-events-none"></div>
        <div className="absolute top-4 left-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>
        <div className="absolute top-4 right-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className="flex items-center gap-2 text-xs text-amber-200/70 mb-5">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trang Chủ
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Tài Khoản</span>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif-tet gold-gradient-text tracking-wide mb-2 uppercase">
              QUẢN LÝ TÀI KHOẢN & ĐƠN QUÀ DOANH NGHIỆP
            </h1>
            <p className="text-xs md:text-sm text-amber-100/70">
              Theo dõi tiến độ đóng gói, vận chuyển hỏa tốc, quản lý sổ địa chỉ phân tán và tải hóa đơn GTGT cho mùa Tết Đinh Mùi 2027.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* COLUMN 1: LEFT SIDEBAR (1/4 screen) */}
          <aside className="lg:col-span-1 bg-[#4a0d0d]/70 backdrop-blur-md border border-amber-500/25 rounded-2xl p-5 shadow-xl space-y-6 gold-border">
            {/* User Profile Card */}
            <div className="flex items-center space-x-4 pb-5 border-b border-amber-500/20">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#380606] flex items-center justify-center overflow-hidden">
                  <span className="font-serif-tet font-bold text-amber-300 text-lg">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center space-x-1.5">
                  <h2 className="font-bold text-white text-base truncate">{currentUser.name}</h2>
                  <i className="fa-solid fa-circle-check text-amber-400 text-xs" title="Tài khoản VIP Đã Xác Minh"></i>
                </div>
                <p className="text-xs text-amber-300/80 font-medium truncate">
                  {currentUser.position || (currentUser.role === 'b2b' ? 'Quản lý thu mua cấp cao' : 'Khách hàng VIP')}
                </p>
                <span className="inline-block mt-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-semibold truncate max-w-full">
                  {currentUser.companyName || 'Tài khoản cá nhân'}
                </span>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1.5 text-sm font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold shadow-inner transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/5 text-amber-300 border-l-4 border-amber-400 font-bold'
                    : 'text-amber-100/75 hover:text-amber-300 hover:bg-red-900/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-box-archive text-amber-400 w-5 text-center"></i>
                  <span>Lịch sử đơn hàng</span>
                </div>
                <span className="bg-amber-400 text-red-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                  {orders.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/5 text-amber-300 border-l-4 border-amber-400 font-bold'
                    : 'text-amber-100/75 hover:text-amber-300 hover:bg-red-900/40'
                }`}
              >
                <i className="fa-solid fa-id-card text-amber-400/80 w-5 text-center"></i>
                <span>Thông tin & Doanh nghiệp</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/5 text-amber-300 border-l-4 border-amber-400 font-bold'
                    : 'text-amber-100/75 hover:text-amber-300 hover:bg-red-900/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-map-location-dot text-amber-400/80 w-5 text-center"></i>
                  <span>Sổ địa chỉ nhận quà</span>
                </div>
                <span className="bg-red-950/80 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                  {savedAddresses.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left cursor-pointer ${
                  activeTab === 'invoices'
                    ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/5 text-amber-300 border-l-4 border-amber-400 font-bold'
                    : 'text-amber-100/75 hover:text-amber-300 hover:bg-red-900/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-file-invoice-dollar text-amber-400/80 w-5 text-center"></i>
                  <span>Hóa đơn VAT</span>
                </div>
                <span className="bg-red-950/80 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                  {invoices.length}
                </span>
              </button>

              {/* Membership Tier Box */}
              <div className="p-3.5 my-3 rounded-xl bg-gradient-to-br from-amber-950/40 to-red-950/60 border border-amber-500/20 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>✨ Hạng B2B Gold</span>
                  <span className="text-amber-200">Chiết khấu 20%</span>
                </div>
                <p className="text-[11px] text-amber-100/60 leading-relaxed">
                  Đã tích lũy: 125/150 hộp quà. Đặt thêm 25 hộp để nâng cấp hạng Bạch Kim (Chiết khấu 25%).
                </p>
                <div className="w-full bg-red-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-300 h-1.5 rounded-full"
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/15">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigateTo('auth');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-300/80 hover:text-red-200 hover:bg-red-900/40 transition-colors text-left cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-red-400 w-5 text-center"></i>
                  <span>Đăng xuất tài khoản</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* COLUMN 2: RIGHT CONTENT (3/4 screen) */}
          <section className="lg:col-span-3 space-y-6">
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <>
                {/* Status Filter Tabs */}
                <div className="bg-[#4a0d0d]/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-2 flex flex-wrap gap-2 text-xs md:text-sm font-semibold">
                  {[
                    { id: 'all', label: `Tất cả đơn (${getStatusCount('all')})` },
                    { id: 'packaging', label: `Đang đóng gói (${getStatusCount('packaging')})` },
                    { id: 'shipping', label: `Đang vận chuyển (${getStatusCount('shipping')})` },
                    { id: 'delivered', label: `Đã giao thành công (${getStatusCount('delivered')})` },
                    { id: 'cancelled', label: `Đã hủy (${getStatusCount('cancelled')})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                        statusFilter === tab.id
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-bold shadow-md'
                          : 'text-amber-200/80 hover:text-amber-300 hover:bg-red-900/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="space-y-5">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 bg-[#4a0d0d]/50 rounded-2xl border border-amber-500/20">
                      <p className="text-sm text-red-200/70">Không có đơn hàng nào trong trạng thái này.</p>
                    </div>
                  ) : (
                    filteredOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-[#4a0d0d]/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl hover:border-amber-400/50 transition-all space-y-5"
                      >
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
                          <div className="flex items-center space-x-3">
                            <span className="font-serif-tet font-extrabold text-lg text-amber-300 tracking-wider">
                              {ord.orderCode}
                            </span>
                            <span className="text-xs text-amber-200/60 font-medium">
                              • Đặt ngày: {ord.createdAt}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {ord.status === 'shipping' && (
                              <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs px-3 py-1 rounded-full font-bold flex items-center space-x-1.5 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                                <span>🚚 {ord.statusText}</span>
                              </span>
                            )}
                            {ord.status === 'packaging' && (
                              <span className="bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs px-3 py-1 rounded-full font-bold flex items-center space-x-1.5">
                                <i className="fa-solid fa-boxes-packing text-yellow-400"></i>
                                <span>📦 {ord.statusText}</span>
                              </span>
                            )}
                            {ord.status === 'delivered' && (
                              <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold flex items-center space-x-1.5">
                                <i className="fa-solid fa-circle-check text-emerald-400"></i>
                                <span>{ord.statusText}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Products List */}
                        <div className="space-y-4">
                          {ord.items.map((prod, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl bg-red-950/40 border border-amber-500/10"
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className="w-16 h-16 rounded-lg bg-cover bg-center border border-amber-500/30 flex-shrink-0 shadow-md relative"
                                  style={{ backgroundImage: `url('${prod.imageUrl}')` }}
                                >
                                  <span className="absolute -top-1 -right-1 bg-amber-500 text-red-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                    {prod.quantity}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-base">{prod.title}</h3>
                                  {prod.subtitle && (
                                    <p className="text-xs text-amber-200/70">{prod.subtitle}</p>
                                  )}
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {prod.customizationBadge && (
                                      <span className="text-[11px] bg-red-900/60 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                                        ✨ {prod.customizationBadge}
                                      </span>
                                    )}
                                    {prod.giftCardBadge && (
                                      <span className="text-[11px] bg-red-900/60 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                                        ✉️ {prod.giftCardBadge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right sm:flex-shrink-0">
                                <span className="font-bold text-amber-300 text-base">
                                  {formatVND(prod.unitPrice)}
                                </span>
                                <span className="text-[11px] text-amber-200/80 block">
                                  x {prod.quantity} bộ
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Summary Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-sm">
                          <div className="text-xs text-amber-200/70 space-y-0.5">
                            <div>
                              <i className="fa-solid fa-location-dot text-amber-400 mr-1.5"></i>
                              Giao đến: {ord.shippingAddress}
                            </div>
                            <div>
                              <i className="fa-solid fa-clock text-amber-400 mr-1.5"></i>
                              Dự kiến giao: {ord.estimatedDelivery}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-amber-200/70 block">
                              Tổng thanh toán (Chiết khấu B2B {ord.discountPercentage}% & VAT 8%):
                            </span>
                            <span className="font-serif-tet font-black text-2xl gold-gradient-text tracking-wide">
                              {formatVND(ord.grandTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center space-x-2 text-xs text-amber-300/80">
                            <i className="fa-solid fa-shield-halved text-amber-400"></i>
                            <span>
                              {ord.status === 'delivered'
                                ? 'Hóa đơn điện tử VAT đã gửi qua email kế toán'
                                : 'Cam kết bảo hiểm vận chuyển vỡ hỏng 100%'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {ord.status === 'delivered' ? (
                              <button
                                type="button"
                                onClick={() => handleReorder(ord.orderCode)}
                                className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                              >
                                <i className="fa-solid fa-rotate-right text-amber-400"></i>
                                <span>Đặt lại đơn này</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  showToast(
                                    'Cố vấn B2B phụ trách đơn hàng của bạn đang sẵn sàng hỗ trợ tại 1900 8888 (Nhánh 1)',
                                    'info'
                                  )
                                }
                                className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                              >
                                <i className="fa-solid fa-phone text-amber-400"></i>
                                <span>Liên hệ hỗ trợ</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDownloadInvoice(ord.orderCode)}
                              className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                            >
                              <i className="fa-solid fa-file-pdf text-amber-400"></i>
                              <span>Tải hóa đơn VAT</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedOrderModal(ord.orderCode)}
                              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center space-x-1.5 shadow-md cursor-pointer"
                            >
                              <i className="fa-solid fa-eye text-red-950"></i>
                              <span>Xem chi tiết đơn</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* TAB 2: PROFILE & ENTERPRISE ("Thông tin & Doanh nghiệp") */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Enterprise Verification Header Card */}
                <div className="bg-gradient-to-r from-[#4a0d0d] via-[#5c1015] to-[#4a0d0d] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none select-none text-8xl text-amber-400 font-serif">
                    ❖
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                        <i className="fa-solid fa-shield-check"></i>
                        <span>ĐÃ XÁC MINH CƠ SỞ DỮ LIỆU THUẾ QUỐC GIA</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif-tet text-white">
                        Hồ Sơ Doanh Nghiệp & Người Đại Diện Thu Mua
                      </h2>
                      <p className="text-xs text-amber-100/75 max-w-2xl leading-relaxed">
                        Thông tin dùng để đối soát hợp đồng mua bán quà Tết, xuất hóa đơn điện tử GTGT và phân bổ nhân sự phụ trách đơn hàng độc quyền.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-red-950/70 border border-amber-400/30 text-right sm:text-right shrink-0">
                      <span className="text-[10px] text-amber-300/80 uppercase font-bold block">
                        ĐẶC QUYỀN HẠNG B2B
                      </span>
                      <span className="text-lg font-black font-serif-tet text-amber-300">
                        GOLD MEMBER (CK 20%)
                      </span>
                      <span className="text-[11px] text-emerald-400 block font-medium">
                        ✓ Miễn phí thiệp chúc Tết & khay lụa
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Edit Form */}
                <div className="bg-[#4a0d0d]/70 backdrop-blur-md border border-amber-500/25 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Section 1: Personal Representative */}
                    <div>
                      <h3 className="text-base font-bold font-serif-tet text-amber-200 border-b border-amber-500/20 pb-2 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-user-tie text-amber-400"></i>
                        <span>1. Thông Tin Người Đại Diện / Đầu Mối Thu Mua</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Họ và Tên Người Đại Diện <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Chức Vụ / Phòng Ban <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.position}
                            onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Email Công Vụ <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Số Điện Thoại / Hotline Zalo <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Enterprise Details */}
                    <div>
                      <h3 className="text-base font-bold font-serif-tet text-amber-200 border-b border-amber-500/20 pb-2 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-building text-amber-400"></i>
                        <span>2. Pháp Nhân Doanh Nghiệp & Đăng Ký Kinh Doanh</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Tên Đầy Đủ Doanh Nghiệp (Theo Giấy Phép ĐKKD) <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.companyName}
                            onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Mã Số Thuế (MST) <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.taxCode}
                            onChange={(e) => setProfileForm({ ...profileForm, taxCode: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Đại Diện Pháp Luật
                          </label>
                          <input
                            type="text"
                            value={profileForm.legalRepresentative}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, legalRepresentative: e.target.value })
                            }
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Địa Chỉ Đăng Ký Kinh Doanh (Trụ sở chính) <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Tỉnh / Thành Phố
                          </label>
                          <input
                            type="text"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-amber-200/90">
                            Số Tài Khoản Doanh Nghiệp (Thanh toán chuyển khoản)
                          </label>
                          <input
                            type="text"
                            value={profileForm.bankAccount}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, bankAccount: e.target.value })
                            }
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-amber-200/70">
                        <i className="fa-solid fa-lock text-amber-400 mr-1.5"></i>
                        Thông tin doanh nghiệp được bảo mật theo tiêu chuẩn ISO/IEC 27001.
                      </p>
                      <button
                        type="submit"
                        className="btn-gold px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-floppy-disk text-red-950"></i>
                        <span>Lưu Thay Đổi Thông Tin</span>
                      </button>
                    </div>
                  </form>

                  {/* Section 3: Dedicated Account Manager */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/80 to-[#3b080c] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-red-950 font-bold text-lg shadow-md shrink-0">
                        HM
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white">Chuyên Viên Cố Vấn B2B Phụ Trách: Hoàng Thị Mai</h4>
                          <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            VIP Manager
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/75 mt-0.5">
                          Túc trực 24/7 hỗ trợ duyệt mẫu sơn mài, điều chỉnh lịch giao nhận và xuất hợp đồng khẩn cấp.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                      <a
                        href="tel:09188882027"
                        className="px-4 py-2 rounded-xl bg-amber-400 text-red-950 text-xs font-bold hover:brightness-110 transition flex items-center space-x-1.5"
                      >
                        <i className="fa-solid fa-phone"></i>
                        <span>0918 888 2027</span>
                      </a>
                      <a
                        href="https://zalo.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-red-900/80 border border-amber-500/40 text-amber-200 text-xs font-bold hover:bg-red-800 transition flex items-center space-x-1.5"
                      >
                        <i className="fa-solid fa-comment-dots"></i>
                        <span>Zalo B2B</span>
                      </a>
                    </div>
                  </div>

                  {/* Section 4: Security & Password */}
                  <div className="pt-4 border-t border-amber-500/20">
                    <h3 className="text-base font-bold font-serif-tet text-amber-200 mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-key text-amber-400"></i>
                      <span>3. Đổi Mật Khẩu Tài Khoản</span>
                    </h3>
                    <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-amber-200/90 mb-1">
                          Mật Khẩu Hiện Tại
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                          }
                          className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-amber-200/90 mb-1">
                          Mật Khẩu Mới (Tối thiểu 6 ký tự)
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                          }
                          className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-amber-200/90 mb-1">
                          Xác Nhận Mật Khẩu Mới
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                          }
                          className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="sm:col-span-3 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-red-950/90 hover:bg-red-900 border border-amber-500/40 text-amber-200 text-xs font-bold transition cursor-pointer"
                        >
                          Cập Nhật Mật Khẩu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ADDRESSES ("Sổ địa chỉ nhận quà") */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                {/* Header Action Bar */}
                <div className="bg-[#4a0d0d]/70 backdrop-blur-md border border-amber-500/25 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold font-serif-tet text-white">
                      Sổ Địa Chỉ Phân Bổ Quà Tết Toàn Quốc
                    </h2>
                    <p className="text-xs text-amber-100/75 mt-1 max-w-xl">
                      Hỗ trợ điều phối giao quà phân tán đến từng chi nhánh, nhà máy, văn phòng đại diện hoặc tư gia đối tác trên 63 tỉnh thành.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setExcelModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-red-950/90 hover:bg-red-900 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                    >
                      <i className="fa-solid fa-file-excel text-emerald-400"></i>
                      <span>Nhập File Excel Phân Bổ</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center space-x-1.5 shadow-md cursor-pointer"
                    >
                      <i className="fa-solid fa-plus text-red-950"></i>
                      <span>+ Thêm Địa Chỉ Mới</span>
                    </button>
                  </div>
                </div>

                {/* Info Notice */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-red-950/40 to-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-3">
                  <i className="fa-solid fa-truck-ramp-box text-amber-400 text-base mt-0.5 shrink-0"></i>
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-300">
                      Giao quà hẹn giờ & Tra cứu hành trình độc quyền:
                    </p>
                    <p className="text-[11px] text-amber-100/80 leading-relaxed">
                      Mỗi điểm nhận đều được nhân viên bưu tá EleGift gọi xác nhận trước khi giao, đồng kiểm niêm phong nguyên vẹn hộp sơn mài và gửi tin nhắn SMS thông báo hoàn tất đến ban quản lý thu mua.
                    </p>
                  </div>
                </div>

                {/* Address Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`rounded-2xl p-5 border shadow-xl flex flex-col justify-between space-y-4 transition-all ${
                        addr.isDefault
                          ? 'bg-gradient-to-b from-[#520f12] to-[#3a080c] border-amber-400/60 shadow-amber-500/10'
                          : 'bg-[#4a0d0d]/70 border-amber-500/25 hover:border-amber-400/40'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm font-serif-tet">
                              {addr.label}
                            </span>
                          </div>
                          {addr.isDefault ? (
                            <span className="bg-amber-400 text-red-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shrink-0">
                              Mặc định
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-[11px] text-amber-300/80 hover:text-amber-200 underline cursor-pointer"
                            >
                              Đặt làm mặc định
                            </button>
                          )}
                        </div>

                        {/* Recipient info */}
                        <div className="text-xs space-y-1 text-red-100/90">
                          <p className="font-semibold text-amber-200 flex items-center gap-1.5">
                            <i className="fa-solid fa-user text-amber-400 text-[11px]"></i>
                            <span>{addr.recipientName}</span>
                          </p>
                          <p className="flex items-center gap-1.5 text-amber-100/80">
                            <i className="fa-solid fa-phone text-amber-400 text-[11px]"></i>
                            <span>{addr.phone}</span>
                          </p>
                          <p className="flex items-start gap-1.5 pt-1 text-amber-100/90 leading-relaxed">
                            <i className="fa-solid fa-location-dot text-amber-400 text-[11px] mt-0.5 shrink-0"></i>
                            <span>
                              {addr.address}, {addr.city}
                            </span>
                          </p>
                          <p className="flex items-center gap-1.5 text-[11px] text-amber-300 pt-1 font-medium">
                            <i className="fa-solid fa-calendar-check text-amber-400 text-[11px]"></i>
                            <span>Hẹn ngày: {addr.deliveryWindow}</span>
                          </p>
                          {addr.notes && (
                            <p className="text-[11px] text-amber-100/60 bg-red-950/60 p-2 rounded-lg border border-amber-500/15 italic">
                              &ldquo;{addr.notes}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <i className="fa-solid fa-circle-check text-[10px]"></i>
                          Tuyến giao hỏa tốc
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditAddress(addr)}
                            className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-amber-500/30 text-amber-300 hover:text-white transition cursor-pointer"
                          >
                            <i className="fa-solid fa-pen mr-1 text-[10px]"></i>
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id, addr.label)}
                            className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/30 text-red-300 hover:text-red-200 transition cursor-pointer"
                          >
                            <i className="fa-solid fa-trash mr-1 text-[10px]"></i>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: VAT INVOICES ("Hóa đơn VAT") */}
            {activeTab === 'invoices' && (
              <div className="space-y-6">
                {/* Default VAT Company Profile Card */}
                <div className="bg-[#4a0d0d]/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-semibold mb-1">
                        <i className="fa-solid fa-file-invoice text-xs"></i>
                        <span>THÔNG TIN XUẤT HÓA ĐƠN ĐIỆN TỬ GTGT (VAT 8%)</span>
                      </div>
                      <h2 className="text-xl font-bold font-serif-tet text-white">
                        Hồ Sơ Thuế Doanh Nghiệp Mặc Định
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingDefaultVat(!isEditingDefaultVat)}
                      className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-amber-500/30 text-amber-300 text-xs font-semibold transition cursor-pointer shrink-0"
                    >
                      <i className="fa-solid fa-pen-to-square mr-1.5"></i>
                      <span>{isEditingDefaultVat ? 'Thu gọn' : 'Chỉnh sửa thông tin VAT'}</span>
                    </button>
                  </div>

                  {isEditingDefaultVat ? (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs font-semibold text-amber-200">Tên Doanh Nghiệp (In trên hóa đơn)</label>
                          <input
                            type="text"
                            value={defaultVatInfo.companyName}
                            onChange={(e) => setDefaultVatInfo({ ...defaultVatInfo, companyName: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-amber-200">Mã Số Thuế (MST)</label>
                          <input
                            type="text"
                            value={defaultVatInfo.taxCode}
                            onChange={(e) => setDefaultVatInfo({ ...defaultVatInfo, taxCode: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-amber-200">Email Nhận Hóa Đơn (Phòng Kế Toán)</label>
                          <input
                            type="email"
                            value={defaultVatInfo.email}
                            onChange={(e) => setDefaultVatInfo({ ...defaultVatInfo, email: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs font-semibold text-amber-200">Địa Chỉ Pháp Lý Theo Đăng Ký Thuế</label>
                          <input
                            type="text"
                            value={defaultVatInfo.address}
                            onChange={(e) => setDefaultVatInfo({ ...defaultVatInfo, address: e.target.value })}
                            className="w-full bg-red-950/70 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingDefaultVat(false);
                            showToast('Đã lưu cấu hình thông tin xuất HĐĐT mặc định!', 'success');
                          }}
                          className="btn-gold px-6 py-2 rounded-xl text-xs font-bold"
                        >
                          Lưu Cấu Hình Thuế
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-red-950/50 border border-amber-500/15">
                        <span className="text-amber-300/70 text-[11px] block">Tổ chức mua hàng:</span>
                        <strong className="text-white block mt-0.5">{defaultVatInfo.companyName}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-red-950/50 border border-amber-500/15">
                        <span className="text-amber-300/70 text-[11px] block">Mã số thuế:</span>
                        <strong className="text-amber-300 font-mono text-sm block mt-0.5">
                          {defaultVatInfo.taxCode}
                        </strong>
                      </div>
                      <div className="p-3 rounded-xl bg-red-950/50 border border-amber-500/15">
                        <span className="text-amber-300/70 text-[11px] block">Email phòng kế toán:</span>
                        <strong className="text-white block mt-0.5 truncate">{defaultVatInfo.email}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-red-950/50 border border-amber-500/15">
                        <span className="text-amber-300/70 text-[11px] block">Trạng thái CSDL:</span>
                        <span className="text-emerald-400 font-bold block mt-0.5 flex items-center gap-1">
                          <i className="fa-solid fa-circle-check"></i> Đang hoạt động
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Issued Invoices List */}
                <div className="bg-[#4a0d0d]/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold font-serif-tet text-white">
                        Danh Sách Hóa Đơn Điện Tử Đã Phát Hành
                      </h3>
                      <p className="text-xs text-amber-200/75">
                        Hóa đơn điện tử có mã của cơ quan thuế theo Nghị định 123/2020/NĐ-CP & Thông tư 78/2021/TT-BTC.
                      </p>
                    </div>
                    <span className="text-xs bg-red-950/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
                      Tổng số: {invoices.length} HĐĐT
                    </span>
                  </div>

                  {/* Invoice Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-amber-500/20 text-amber-300/80 uppercase text-[10px] tracking-wider font-bold">
                          <th className="py-3 px-3">Số HĐ / Ký Hiệu</th>
                          <th className="py-3 px-3">Ngày Ký</th>
                          <th className="py-3 px-3">Đơn Hàng</th>
                          <th className="py-3 px-3 text-right">Tiền Trước Thuế</th>
                          <th className="py-3 px-3 text-right">VAT (8%)</th>
                          <th className="py-3 px-3 text-right">Tổng Thanh Toán</th>
                          <th className="py-3 px-3 text-center">Trạng Thái Thuế</th>
                          <th className="py-3 px-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-500/10">
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-red-950/40 transition">
                            <td className="py-3.5 px-3">
                              <span className="font-mono font-bold text-amber-300 text-sm block">
                                {inv.invoiceNumber}
                              </span>
                              <span className="text-[10px] text-amber-200/60 block font-mono">
                                Ký hiệu: {inv.symbol}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-amber-100/90 whitespace-nowrap">
                              {inv.issueDate}
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="font-bold text-white block">{inv.orderCode}</span>
                              <span className="text-[11px] text-amber-200/60 line-clamp-1 max-w-[200px]">
                                {inv.orderItemsSummary}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-right text-amber-200/90 font-medium">
                              {formatVND(inv.subtotal)}
                            </td>
                            <td className="py-3.5 px-3 text-right text-amber-300/80">
                              {formatVND(inv.vatAmount)}
                            </td>
                            <td className="py-3.5 px-3 text-right font-serif-tet font-bold text-amber-300 text-sm">
                              {formatVND(inv.grandTotal)}
                            </td>
                            <td className="py-3.5 px-3 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                                <i className="fa-solid fa-check text-[9px]"></i>
                                Mã CQT Hợp Lệ
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedInvoice(inv)}
                                  className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-red-950 font-bold hover:brightness-110 transition cursor-pointer text-[11px]"
                                  title="Xem bản thể hiện HĐĐT"
                                >
                                  <i className="fa-solid fa-eye mr-1"></i>
                                  Xem
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    showToast(
                                      `Đang tải bản thể hiện PDF hóa đơn số ${inv.invoiceNumber}...`,
                                      'info'
                                    )
                                  }
                                  className="px-2.5 py-1.5 rounded-lg bg-red-950/80 border border-amber-500/30 text-amber-300 hover:text-white transition cursor-pointer text-[11px]"
                                  title="Tải file PDF"
                                >
                                  <i className="fa-solid fa-file-pdf"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    showToast(
                                      `Đang tải dữ liệu gốc XML (Hợp lệ thuế) hóa đơn số ${inv.invoiceNumber}...`,
                                      'info'
                                    )
                                  }
                                  className="px-2.5 py-1.5 rounded-lg bg-red-950/80 border border-amber-500/30 text-amber-300 hover:text-white transition cursor-pointer text-[11px]"
                                  title="Tải file XML gốc"
                                >
                                  <i className="fa-solid fa-file-code"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* 24/7 VIP Fast Support Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-950 via-[#4a0d0d] to-red-950 border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-amber-500/10 text-9xl font-serif select-none pointer-events-none">
            ❖
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-red-950 text-2xl font-black shadow-lg flex-shrink-0">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif-tet font-bold text-xl text-white">
                    Chăm Sóc & Điều Phối Đơn Hàng Doanh Nghiệp 24/7
                  </h3>
                  <span className="bg-amber-400 text-red-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    VIP Hotline
                  </span>
                </div>
                <p className="text-xs text-amber-200/80 mt-1 max-w-2xl leading-relaxed">
                  Cần gấp thay đổi tiến độ giao nhận, bổ sung địa chỉ chi nhánh toàn quốc hoặc xuất thêm hợp đồng
                  kinh tế? Đội ngũ cố vấn B2B EleGift luôn túc trực phục vụ riêng cho doanh nghiệp của bạn.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0 w-full md:w-auto justify-end">
              <a
                href="tel:19008888"
                className="btn-gold px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center space-x-2 shadow-lg"
              >
                <i className="fa-solid fa-phone text-sm"></i>
                <span>Hotline: 1900 8888 (Nhánh 1)</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-red-900/70 hover:bg-red-800/80 border border-amber-400/50 text-amber-200 text-xs font-bold tracking-wide flex items-center space-x-2 transition-all"
              >
                <span>Chat Zalo B2B</span>
              </a>
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-b from-[#3d080c] to-[#1e0406] border border-amber-400/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                <h4 className="font-serif-tet font-bold text-lg text-amber-200">
                  Chi Tiết Đơn Hàng {selectedOrderModal}
                </h4>
                <button
                  onClick={() => setSelectedOrderModal(null)}
                  className="w-7 h-7 rounded-full bg-red-950 text-amber-300 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="text-xs space-y-2 text-red-100/90">
                <p>
                  <strong>Khách hàng:</strong> {currentUser.name} ({currentUser.position || 'Quản lý thu mua'} - {currentUser.companyName || 'Doanh Nghiệp'})
                </p>
                <p>
                  <strong>Chính sách áp dụng:</strong> Chiết khấu B2B 20% + Đóng gói sơn mài thượng hạng + Thiệp mừng Ban Lãnh Đạo
                </p>
                <p>
                  <strong>Chứng từ kèm theo:</strong> Hóa đơn điện tử VAT 8%, Hợp đồng thương mại điện tử, Biên bản nghiệm thu & bàn giao.
                </p>
                <p className="text-emerald-400">
                  ✓ Hàng hóa được đóng gói chèn xốp chuyên dụng và niêm phong bằng tem bảo chứng EleGift.
                </p>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedOrderModal(null)}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-red-950 font-bold text-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Address Modal */}
        {addressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-b from-[#3d080c] to-[#1e0406] border border-amber-400/50 rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                <h4 className="font-serif-tet font-bold text-lg text-amber-200">
                  {editingAddressId ? 'Chỉnh Sửa Địa Chỉ Nhận Quà' : 'Thêm Địa Chỉ Nhận Quà Mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-red-950 text-amber-300 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">
                    Tên Nhãn Điểm Giao / Chi Nhánh <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Chi nhánh Cần Thơ, Nhà máy Bắc Ninh..."
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-amber-200">
                      Họ Tên Người Nhận <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Trần Văn B (Giám đốc CN)"
                      value={addressForm.recipientName}
                      onChange={(e) => setAddressForm({ ...addressForm, recipientName: e.target.value })}
                      className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-amber-200">
                      Số Điện Thoại <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0912 888 999"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">
                    Địa Chỉ Chi Tiết (Số nhà, Tòa nhà, Đường) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Tòa nhà Landmark 81, 720A Điện Biên Phủ, P.22, Bình Thạnh"
                    value={addressForm.address}
                    onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                    className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-amber-200">Tỉnh / Thành Phố</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-amber-200">Ngày / Khung Giờ Hẹn Giao</label>
                    <input
                      type="text"
                      placeholder="VD: 20/01/2027 (Trước 23 Tháng Chạp)"
                      value={addressForm.deliveryWindow}
                      onChange={(e) => setAddressForm({ ...addressForm, deliveryWindow: e.target.value })}
                      className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">Ghi Chú Giao Hàng Đặc Biệt</label>
                  <input
                    type="text"
                    placeholder="VD: Giao giờ hành chính, gọi trước 30p, kiểm đếm tại quầy lễ tân"
                    value={addressForm.notes}
                    onChange={(e) => setAddressForm({ ...addressForm, notes: e.target.value })}
                    className="w-full bg-red-950/80 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="rounded border-amber-400 text-amber-500 focus:ring-0 bg-red-950/90 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-amber-200 font-medium">Đặt làm địa chỉ nhận quà mặc định</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end space-x-3 border-t border-amber-500/20">
                  <button
                    type="button"
                    onClick={() => setAddressModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-red-950 text-amber-200 hover:bg-red-900 text-xs font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer"
                  >
                    Lưu Địa Chỉ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Batch Excel Import Modal */}
        {excelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-gradient-to-b from-[#3d080c] to-[#1e0406] border border-amber-400/50 rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-file-excel text-emerald-400 text-lg"></i>
                  <h4 className="font-serif-tet font-bold text-lg text-amber-200">
                    Phân Bổ Quà Tặng Bằng File Excel
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setExcelModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-red-950 text-amber-300 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-amber-100/90">
                <p>
                  Giải pháp dành cho doanh nghiệp có hàng trăm chi nhánh hoặc đối tác: Tải file mẫu của EleGift, điền danh sách địa chỉ nhận quà và tải lên để hệ thống tự động đồng bộ.
                </p>

                <div className="p-3.5 rounded-xl bg-red-950/70 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">File mẫu chuẩn EleGift:</span>
                    <button
                      type="button"
                      onClick={handleDownloadSampleExcel}
                      className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <i className="fa-solid fa-download"></i> Tải file .xlsx mẫu
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-200/70">
                    Bao gồm các cột: Tên chi nhánh, Họ tên người nhận, SĐT, Địa chỉ, Tỉnh thành, Ngày giao hẹn ước, Ghi chú.
                  </p>
                </div>

                {/* Simulated Drag & Drop Zone */}
                <div
                  onClick={handleSimulateExcelImport}
                  className="border-2 border-dashed border-amber-400/40 rounded-2xl p-8 text-center bg-red-950/40 hover:bg-red-900/40 hover:border-amber-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto text-xl">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <p className="font-bold text-white text-xs">
                    {excelSimulated ? 'Đang trích xuất dữ liệu...' : 'Nhấn vào đây để tải lên file Excel (.xlsx / .csv)'}
                  </p>
                  <p className="text-[11px] text-amber-200/60">
                    Hoặc kéo thả file bảng tính phân bổ chi nhánh của doanh nghiệp vào đây
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-amber-300/80">
                    <i className="fa-solid fa-shield-halved text-amber-400 mr-1"></i>
                    Bảo mật tuyệt đối danh sách đối tác B2B
                  </span>
                  <button
                    type="button"
                    onClick={handleSimulateExcelImport}
                    className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Nạp Dữ Liệu Demo 2 Điểm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VAT Electronic Invoice Modal (Bản thể hiện HĐĐT) */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8 border-4 border-amber-600/30">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-red-700 tracking-wider uppercase">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </div>
                  <div className="text-[10px] text-gray-500">Độc lập - Tự do - Hạnh phúc</div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 mt-2">
                    HÓA ĐƠN GIÁ TRỊ GIA TĂNG (VAT)
                  </h3>
                  <div className="text-xs text-gray-600 italic">
                    (Bản thể hiện của hóa đơn điện tử - Nghị định 123/2020/NĐ-CP)
                  </div>
                </div>

                <div className="text-right text-xs space-y-0.5 font-mono">
                  <div>
                    Ký hiệu: <strong>{selectedInvoice.symbol}</strong>
                  </div>
                  <div>
                    Số: <strong className="text-red-700 text-sm">{selectedInvoice.invoiceNumber}</strong>
                  </div>
                  <div className="text-[11px] text-gray-500">Ngày lập: {selectedInvoice.issueDate}</div>
                  <div className="mt-1">
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                      Mã CQT: {selectedInvoice.cqtCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="space-y-1">
                  <span className="font-bold text-gray-700 block uppercase text-[10px]">ĐƠN VỊ BÁN HÀNG:</span>
                  <div className="font-bold text-red-900">CÔNG TY CỔ PHẦN QUÀ TẶNG CAO CẤP ELEGIFT VIỆT NAM</div>
                  <div>MST: <strong>0109887766</strong></div>
                  <div>Địa chỉ: 88 Phố Huế, P. Hàng Bài, Q. Hoàn Kiếm, TP. Hà Nội</div>
                  <div>Hotline: 1900 8888 • Số TK: 1100 2233 4455 tại Vietcombank</div>
                </div>

                <div className="space-y-1 sm:border-l sm:border-gray-200 sm:pl-4">
                  <span className="font-bold text-gray-700 block uppercase text-[10px]">ĐƠN VỊ MUA HÀNG:</span>
                  <div className="font-bold text-gray-900">{selectedInvoice.buyerCompany}</div>
                  <div>MST: <strong>{selectedInvoice.buyerTaxCode}</strong></div>
                  <div>Người mua: {selectedInvoice.buyerName}</div>
                  <div>Địa chỉ: {selectedInvoice.buyerAddress}</div>
                  <div>Hình thức TT: Chuyển khoản (B2B Contract)</div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 border-b border-gray-200 font-bold text-gray-700">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-10">STT</th>
                      <th className="py-2.5 px-3 text-left">Tên Hàng Hóa, Dịch Vụ</th>
                      <th className="py-2.5 px-3 text-center">ĐVT</th>
                      <th className="py-2.5 px-3 text-right">Thành Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3 text-center">1</td>
                      <td className="py-3 px-3 font-medium text-gray-900">
                        {selectedInvoice.orderItemsSummary} (Mã đơn: {selectedInvoice.orderCode})
                      </td>
                      <td className="py-3 px-3 text-center">Bộ quà</td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        {formatVND(selectedInvoice.subtotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="text-xs space-y-1.5 border-t border-gray-200 pt-3">
                <div className="flex justify-between text-gray-700">
                  <span>Cộng tiền hàng (chưa bao gồm thuế GTGT):</span>
                  <span className="font-mono font-bold">{formatVND(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Thuế suất GTGT: <strong>{selectedInvoice.vatRate}%</strong></span>
                  <span className="font-mono font-bold">{formatVND(selectedInvoice.vatAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-red-900 border-t border-gray-200 pt-2">
                  <span>Tổng cộng tiền thanh toán (Đã có thuế VAT):</span>
                  <span className="font-mono text-base">{formatVND(selectedInvoice.grandTotal)}</span>
                </div>
              </div>

              {/* Digital Signature Stamp */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-gray-200 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold">
                    <i className="fa-solid fa-signature text-emerald-600"></i>
                    <span>SIGNATURE VALID - ĐÃ KÝ ĐIỆN TỬ</span>
                  </div>
                  <div className="text-[11px]">Ký bởi: CÔNG TY CỔ PHẦN QUÀ TẶNG CAO CẤP ELEGIFT VIỆT NAM</div>
                  <div className="text-[10px] text-emerald-700">Ngày ký: {selectedInvoice.issueDate} 14:30:22 (GMT+7)</div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-print"></i>
                    <span>In Hóa Đơn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Đang tải file PDF hóa đơn số ${selectedInvoice.invoiceNumber}...`, 'info');
                    }}
                    className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-file-pdf"></i>
                    <span>Tải PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(null)}
                    className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
