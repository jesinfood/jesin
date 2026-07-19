const ADMIN_STORAGE_KEY = 'jesin-admin-logged-in';
const PRODUCT_STORAGE_KEY = 'jesin-products';

const defaultProducts = [
  {
    id: 1,
    name: 'Krupuk Mentah',
    price: 'Rp15.000',
    description: 'Mentah: Rp15.000. Siap makan: Rp12.000. Cocok untuk camilan dan stok rumah.',
    image: 'assets/images/krupuk-mentah.jpg',
    category: 'Produk Unggulan'
  },
  {
    id: 2,
    name: 'Baby Crab',
    price: 'Rp18.000',
    description: 'Tersedia varian original, balado pedas, bbq, sapi panggang, dan jagung bakar.',
    image: 'assets/images/baby-crab.jpeg',
    category: 'Produk Unggulan'
  },
  {
    id: 3,
    name: 'Kerupuk Siap Makan',
    price: 'Rp12.000',
    description: 'Camilan praktis yang langsung bisa dinikmati tanpa perlu pengolahan lagi.',
    image: 'assets/images/kerupuk-siap-makan.jpg',
    category: 'Produk Unggulan'
  },
  {
    id: 4,
    name: 'Abon Jesin (Araco)',
    price: 'Rp25.000 / 100 gram',
    description: 'Abon gurih dan renyah dengan rasa khas yang cocok untuk pelengkap nasi.',
    image: 'assets/images/abon-jesin.jpg',
    category: 'Produk PO'
  },
  {
    id: 6,
    name: 'Bahan Baku Keripik Rajungan',
    price: 'Rp20.000',
    description: 'Bahan baku keripik rajungan pilihan dengan kualitas terbaik, cocok untuk diolah menjadi camilan seafood khas Cirebon. Memiliki cita rasa gurih alami dan tekstur yang pas untuk menghasilkan keripik rajungan yang renyah dan lezat.',
    image: 'assets/images/bahan-baku-keripik-rajungan.jpg',
    category: 'Produk PO'
  },
  {
    id: 7,
    name: 'Krupuk Udang Ronggeng',
    price: 'Rp15.000',
    description: 'Krupuk renyah dengan rasa udang yang khas dan pas untuk camilan.',
    image: 'assets/images/placeholder.svg',
    category: 'Produk PO'
  },
  {
    id: 7,
    name: 'Ikan Krispi',
    price: 'Rp10.000',
    description: 'Ikan krispi yang renyah, gurih, dan cocok untuk berbagai kesempatan.',
    image: 'assets/images/ikan-krispi.jpg',
    category: 'Produk PO'
  },
  {
    id: 8,
    name: 'Intip Kriuk',
    price: 'Rp5.000 / 100 gram',
    description: 'Camilan ringan berbentuk kriuk yang populer dan praktis dibawa kemana saja.',
    image: 'assets/images/intip-kriuk.jpeg',
    category: 'Produk PO'
  },
  {
    id: 9,
    name: 'Kembang Goyang',
    price: 'Rp15.000 / 100 gram',
    description: 'Makanan ringan yang unik dan cocok untuk oleh-oleh.',
    image: 'assets/images/placeholder.svg',
    category: 'Produk PO'
  },
  {
    id: 10,
    name: 'Aneka Ikan Asin',
    price: 'Rp15.000 / 100 gram',
    description: 'Bilis, Dua Waja, Teri Kapasan, Japu, Lemat, dan berbagai varian lainnya.',
    image: 'assets/images/placeholder.svg',
    category: 'Produk PO'
  },
  {
    id: 11,
    name: 'Popcorn Warna Warni',
    price: 'Rp2.500 / pcs (30 gram)',
    description: 'Popcorn warna warni dengan rasa manis dan tekstur renyah yang cocok sebagai camilan ringan. Dikemas praktis dengan porsi 30 gram, memiliki tampilan menarik dan rasa lezat yang cocok untuk berbagai suasana.',
    image: 'assets/images/popcorn-ya.jpeg',
    category: 'Produk PO'
  }
];

let currentEditId = null;

function normalizeProductsForAdmin(products) {
  const normalized = Array.isArray(products) ? products.filter(Boolean) : [];
  const cleaned = normalized.filter((product) => {
    const name = (product.name || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    const isKrupukMentah = name.includes('krupuk mentah') || name.includes('kerupuk mentah');
    const isKrupukSiap = name.includes('krupuk siap') || name.includes('kerupuk siap');
    const isMerged = isKrupukMentah && description.includes('siap makan');
    return !isMerged;
  });

  const result = cleaned.filter((product) => {
    const name = (product.name || '').toLowerCase();
    return !name.includes('krupuk mentah') && !name.includes('kerupuk mentah') && !name.includes('krupuk siap') && !name.includes('kerupuk siap') && !name.includes('bahan baku baby crab');
  }).map((product) => {
    const name = (product.name || '').toLowerCase();
    if (name.includes('baby crab')) {
      return { ...product, image: 'assets/images/baby-crab.jpeg' };
    }
    return product;
  });

  const names = new Set(result.map((product) => (product.name || '').toLowerCase()));

  if (!names.has('popcorn warna warni')) {
    const insertIndex = result.findIndex((product) => (product.name || '').toLowerCase().includes('aneka ikan asin'));
    result.splice(insertIndex >= 0 ? insertIndex : result.length, 0, {
      id: Date.now() + 4,
      name: 'Popcorn Warna Warni',
      price: 'Rp2.500',
      description: 'Popcorn warna warni dengan rasa manis dan tekstur renyah yang cocok sebagai camilan ringan. Dikemas praktis dengan porsi 30 gram, memiliki tampilan menarik dan rasa lezat yang cocok untuk berbagai suasana.',
      image: 'assets/images/popcorn-ya.jpeg',
      category: 'Produk PO'
    });
  }

  result.unshift({
    id: Date.now(),
    name: 'Krupuk Mentah',
    price: 'Rp15.000',
    description: 'Krupuk mentah berkualitas untuk stok rumah dan olahan lebih lanjut.',
    image: 'assets/images/krupuk-mentah.jpg',
    category: 'Produk Unggulan'
  });

  result.splice(1, 0, {
    id: Date.now() + 1,
    name: 'Kerupuk Siap Makan',
    price: 'Rp12.000',
    description: 'Camilan praktis yang langsung bisa dinikmati tanpa perlu pengolahan lagi.',
    image: 'assets/images/kerupuk-siap-makan.jpg',
    category: 'Produk Unggulan'
  });

  return result;
}

function getProducts() {
  const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  try {
    const parsed = JSON.parse(stored);
    const normalized = normalizeProductsForAdmin(parsed);
    if (JSON.stringify(normalized) !== JSON.stringify(parsed)) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch (error) {
    console.error('Gagal membaca produk:', error);
    return defaultProducts;
  }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

function resolveProductImage(product) {
  const name = (product.name || '').toLowerCase();

  if (name.includes('krupuk mentah')) return 'assets/images/krupuk-mentah.jpg';
  if (name.includes('kerupuk siap')) return 'assets/images/kerupuk-siap-makan.jpg';
  if (name.includes('baby crab')) return 'assets/images/baby-crab.jpeg';
  if (name.includes('intip')) return 'assets/images/intip-kriuk.jpeg';
  if (name.includes('bahan baku keripik rajungan')) return 'assets/images/bahan-baku-keripik-rajungan.jpg';
  if (name.includes('popcorn')) return 'assets/images/popcorn-ya.jpeg';
  if (name.includes('abon')) return 'assets/images/abon-jesin.jpg';
  if (name.includes('ikan krispi')) return 'assets/images/ikan-krispi.jpg';

  return product.image || 'assets/images/placeholder.svg';
}

function createAdminVisual(product) {
  const imagePath = resolveProductImage(product);
  if (imagePath.includes('placeholder.svg')) {
    const name = (product.name || '').toLowerCase();

    if (name.includes('abon')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="18" y="20" width="84" height="72" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><path d="M34 48c10-18 42-18 52 0-10 20-42 20-52 0Z" fill="#c97861"/><path d="M42 42c6-6 16-6 22 0" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg></div>`;
    }

    if (name.includes('udang')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="16" y="18" width="88" height="80" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><path d="M36 44h48" stroke="#c97861" stroke-width="8" stroke-linecap="round"/><path d="M38 56h20" stroke="#f2a67f" stroke-width="6" stroke-linecap="round"/><path d="M74 36c10 10 10 24 0 34" stroke="#4c3d3d" stroke-width="6" stroke-linecap="round"/><circle cx="74" cy="58" r="9" fill="#f1b592"/></svg></div>`;
    }

    if (name.includes('ikan krispi')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="16" y="18" width="88" height="80" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><path d="M32 58c10-12 20-16 32-16 15 0 24 10 32 20-8 8-18 14-32 14-14 0-24-6-32-18Z" fill="#4c3d3d"/><path d="M44 42c5-7 12-10 20-10" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg></div>`;
    }

    if (name.includes('intip')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="16" y="18" width="88" height="80" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><path d="M34 44h52" stroke="#c97861" stroke-width="8" stroke-linecap="round"/><path d="M38 58h44" stroke="#f1b592" stroke-width="6" stroke-linecap="round"/><path d="M44 72h32" stroke="#4c3d3d" stroke-width="6" stroke-linecap="round"/></svg></div>`;
    }

    if (name.includes('kembang goyang')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="16" y="18" width="88" height="80" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><circle cx="60" cy="58" r="20" fill="#f1b592"/><path d="M60 28v16M60 78v16M32 58h16M72 58h16M38 36l12 12M70 70l12 12M38 80l12-12M70 46l12-12" stroke="#c97861" stroke-width="4" stroke-linecap="round"/></svg></div>`;
    }

    if (name.includes('ikan asin')) {
      return `<div class="admin-thumb"><svg viewBox="0 0 120 120"><rect x="16" y="18" width="88" height="80" rx="20" fill="#fff2e8" stroke="#f0b79a" stroke-width="4"/><path d="M34 56c8-10 20-16 32-16 10 0 18 4 24 10-6 10-16 16-26 16-11 0-20-4-30-10Z" fill="#4c3d3d"/><path d="M42 38c5-6 10-8 16-8" stroke="#c97861" stroke-width="4" stroke-linecap="round"/><path d="M76 44c4 0 8 2 10 4" stroke="#f0b79a" stroke-width="4" stroke-linecap="round"/></svg></div>`;
    }
  }

  return `<img class="admin-thumb" src="${imagePath}" alt="${product.name}" onerror="this.onerror=null;this.src='assets/images/placeholder.svg';" />`;
}

function renderAdminProducts() {
  const products = getProducts();
  const container = document.getElementById('admin-product-list');
  if (!container) return;

  if (!products.length) {
    container.innerHTML = '<p>Belum ada produk.</p>';
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
        <div class="admin-item">
          ${createAdminVisual(product)}
          <div class="admin-item-content">
            <strong>${product.name}</strong>
            <p>${product.price}</p>
            <p>${product.category}</p>
          </div>
          <div class="admin-actions">
            <button class="btn btn-secondary edit-btn" data-id="${product.id}">Edit</button>
            <button class="btn btn-primary delete-btn" data-id="${product.id}">Hapus</button>
          </div>
        </div>
      `
    )
    .join('');
}

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('product-image').value = 'assets/images/placeholder.svg';
  document.getElementById('product-category').value = 'Produk Unggulan';
  currentEditId = null;
  document.querySelector('#product-form button[type="submit"]').textContent = 'Simpan Produk';
}

function populateForm(product) {
  document.getElementById('product-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-description').value = product.description;
  document.getElementById('product-image').value = product.image;
  document.getElementById('product-category').value = product.category;
  currentEditId = product.id;
  document.querySelector('#product-form button[type="submit"]').textContent = 'Simpan Perubahan';
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    showDashboard();
  } else {
    document.getElementById('login-message').textContent = 'Username atau password salah.';
  }
}

function showDashboard() {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('dashboard-section').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('dashboard-section').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(ADMIN_STORAGE_KEY) === 'true') {
    showDashboard();
  } else {
    showLogin();
  }

  renderAdminProducts();

  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    showLogin();
    resetForm();
  });

  document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const products = getProducts();
    const payload = {
      id: currentEditId || Date.now(),
      name: document.getElementById('product-name').value.trim(),
      price: document.getElementById('product-price').value.trim(),
      description: document.getElementById('product-description').value.trim(),
      image: document.getElementById('product-image').value || 'assets/images/placeholder.svg',
      category: document.getElementById('product-category').value
    };

    if (!payload.name || !payload.price || !payload.description) {
      document.getElementById('login-message').textContent = 'Semua kolom wajib diisi.';
      return;
    }

    if (currentEditId) {
      const index = products.findIndex((item) => item.id === currentEditId);
      if (index >= 0) products[index] = payload;
    } else {
      products.push(payload);
    }

    saveProducts(products);
    renderAdminProducts();
    resetForm();
  });

  document.getElementById('cancel-edit').addEventListener('click', resetForm);

  document.addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-btn');
    if (editButton) {
      const product = getProducts().find((item) => item.id === Number(editButton.dataset.id));
      if (product) populateForm(product);
    }

    const deleteButton = event.target.closest('.delete-btn');
    if (deleteButton) {
      const id = Number(deleteButton.dataset.id);
      const updatedProducts = getProducts().filter((item) => item.id !== id);
      saveProducts(updatedProducts);
      renderAdminProducts();
      if (currentEditId === id) resetForm();
    }
  });
});
