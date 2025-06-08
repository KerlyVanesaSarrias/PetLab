
class ApiManager {
  constructor(baseUrl = 'http://localhost:8081') {
    this.baseUrl = baseUrl;
    this.storage = window.firebaseStorage;
  }

    _getAuthHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  async checkConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/productos`);
      return response.ok;
    } catch (error) {
      console.error('Error conectando con la API:', error);
      return false;
    }
  }

  

  async uploadImage(file, folder = 'productos') {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js");
      
      const storageRef = ref(this.storage, `${folder}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log("Imagen subida exitosamente");
      return downloadURL;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.baseUrl}/productos`);
      if (!response.ok) throw new Error('Error obteniendo productos');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  }

  async getServices() {
    try {
      const response = await fetch(`${this.baseUrl}/servicios`);
      if (!response.ok) throw new Error('Error obteniendo servicios');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo servicios:', error);
      throw error;
    }
  }

  async getAllItems() {
    try {
      const [products, services] = await Promise.all([
        this.getProducts(),
        this.getServices()
      ]);

      const normalizedProducts = products.map(product => ({
        ...product,
        tipo: 'Producto',
        id: product.id_Product,
        imagen: product.imagen,
        nombre: product.nombre,
        categoria: product.categoria,
        descripcion: product.descripcion,
        precio: parseInt(product.precio),
        caracteristicas: product.caracteristicas,
        stock: parseInt(product.stock)
      }));

      const normalizedServices = services.map(service => ({
        ...service,
        tipo: 'Servicio',
        id: service.id_servicio,
        imagen: service.imagen,
        nombre: service.nombre,
        categoria: service.categoria,
        descripcion: service.descripcion,
        precio: parseInt(service.precio),
        caracteristicas: service.caracteristicas,
        stock: parseInt(service.stock),
        recomendacion: service.recomendaciones || '',
        duracion: service.duracion || '',
        agenda: service.agenda || ''
      }));

      return [...normalizedProducts, ...normalizedServices];
    } catch (error) {
      console.error('Error obteniendo todos los elementos:', error);
      throw error;
    }
  }



  // Actualizar producto
  async updateProduct(id, productData, imageFile = null) {
    try {
      let imagenUrl = productData.imagen;
      
      if (imageFile) {
        imagenUrl = await this.uploadImage(imageFile, 'productos');
      }

      const response = await fetch(`${this.baseUrl}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            ...this._getAuthHeaders() },
        body: JSON.stringify({
          imagen: imagenUrl,
          nombre: productData.nombre,
          categoria: productData.categoria,
          caracteristicas: productData.caracteristicas,
          stock: productData.stock,
          precio: productData.precio,
          descripcion: productData.descripcion
        })
      });

      if (!response.ok) throw new Error('Error actualizando producto');
      
      const result = await response.json();
      console.log("Producto actualizado:", result);
      return result;
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  }

  // Actualizar servicio
  async updateService(id, serviceData, imageFile = null) {
    try {
      let imagenUrl = serviceData.imagen;
      
      if (imageFile) {
        imagenUrl = await this.uploadImage(imageFile, 'servicios');
      }

      const response = await fetch(`${this.baseUrl}/servicios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            ...this._getAuthHeaders()},
        body: JSON.stringify({
          imagen: imagenUrl,
          nombre: serviceData.nombre,
          categoria: serviceData.categoria,
          caracteristicas: serviceData.caracteristicas,
          stock: serviceData.stock,
          precio: serviceData.precio,
          descripcion: serviceData.descripcion,
          recomendaciones: serviceData.recomendacion || '',
          agenda: serviceData.agenda || '',
          duracion: serviceData.duracion || ''
        })
      });

      if (!response.ok) throw new Error('Error actualizando servicio');
      
      const result = await response.json();
      console.log("Servicio actualizado:", result);
      return result;
    } catch (error) {
      console.error('Error actualizando servicio:', error);
      throw error;
    }
  }

  // Eliminar producto
  async deleteProduct(id) {
    try {
      const response = await fetch(`${this.baseUrl}/productos/${id}`, {
        method: 'DELETE',
         headers: { 
        ...this._getAuthHeaders() 
      }
      });

      if (!response.ok) throw new Error('Error eliminando producto');
      
      const result = await response.json();
      console.log("Producto eliminado:", result.message);
      return result;
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  }

  // Eliminar servicio
  async deleteService(id) {
    try {
      const response = await fetch(`${this.baseUrl}/servicios/${id}`, {
        method: 'DELETE',
         headers: { 
        ...this._getAuthHeaders() 
      }
      });

      if (!response.ok) throw new Error('Error eliminando servicio');
      
      const result = await response.json();
      console.log("Servicio eliminado:", result);
      return result;
    } catch (error) {
      console.error('Error eliminando servicio:', error);
      throw error;
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/productos/${id}`);
      if (!response.ok) throw new Error('Error obteniendo producto');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      throw error;
    }
  }

  // Obtener servicio por ID
  async getServiceById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/servicios/${id}`);
      if (!response.ok) throw new Error('Error obteniendo servicio');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo servicio:', error);
      throw error;
    }
  }
}

window.ApiManager = ApiManager;