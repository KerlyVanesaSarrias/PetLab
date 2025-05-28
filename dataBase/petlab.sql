create database petlab;
use petlab;


-- Tabla Usuario
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR (100),
    contraseña VARCHAR(255) 
) ENGINE=InnoDB;

-- Tabla Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
     total  DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
   ) ENGINE=InnoDB;

-- Tabla Detalles_Pedido
CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    servicio_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
) ENGINE=InnoDB;


-- Tabla productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
   categoría VARCHAR(1000) NOT NULL,
    descripcion TEXT NOT NULL,
     imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
     características VARCHAR(1000) NOT NULL,
    stock INT NOT NULL DEFAULT 0
    ) ENGINE=InnoDB;

-- Tabla servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
   categoría VARCHAR(1000) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    características VARCHAR(1000) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    recomendaciones TEXT NOT NULL,
	duración VARCHAR(1000) NOT NULL,
	agenda VARCHAR(1000) NOT NULL
) ENGINE=InnoDB;

-- Tabla ventas
CREATE TABLE venta(
   id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago_id INT,
    pedido_id INT, 
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
 ) ENGINE=InnoDB;

-- Tabla Contacto
 CREATE TABLE contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Teléfono VARCHAR(20),
    Tipo_contacto VARCHAR(50),
    Mensaje TEXT,
    Usuario_id  INT,
    producto_contacto_id  INT,
    servicio_contacto_id INT,
    adjunto_id INT,
    FOREIGN KEY (Usuario_id  ) REFERENCES usuarios(id),
    FOREIGN KEY (producto_contacto_id ) REFERENCES productos(id),
    FOREIGN KEY (servicio_contacto_id) REFERENCES servicios(id),
    FOREIGN KEY (adjunto_id) REFERENCES archivos_adjuntos(id)
) ENGINE=InnoDB;

-- Tabla Producto consulta
CREATE TABLE producto_consulta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Numero_orden VARCHAR(100) NOT NULL,
    Fecha_compra DATE NOT NULL,
   contacto_id INT,
    FOREIGN KEY (contacto_id) REFERENCES contacto(id)
) ENGINE=InnoDB;

-- Tabla Servicio consulta
CREATE TABLE servicio_consulta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_servicio VARCHAR(100 )NOT NULL,
    Fecha_servicio DATE NOT NULL,
    Hora_servicio TIME NOT NULL,
    Contacto_id INT,
    FOREIGN KEY (Contacto_id) REFERENCES contacto(id)
) ENGINE=InnoDB;

-- Tabla Archivos adjuntos

CREATE TABLE archivos_adjuntos (
id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_adjunto VARCHAR(255) NOT NULL,
    Tipo VARCHAR(100) NOT NULL,
    Tamaño INT,
    Contact_id INT,
    FOREIGN KEY (Contact_id) REFERENCES contacto(id)
) ENGINE=InnoDB;


-- Insertar información en las tablas

-- Tabla Usuario
INSERT INTO usuarios (nombre, email, telefono, contraseña) VALUES
('Laura Martínez', 'laura.martinez@gmail.com', '3001234567', '1234segura'),
('Carlos Ramírez', 'carlos.ramirez@gmail.com', '3112345678', 'contrasena123'),
('Andrea Torres', 'andrea.torres@gmail.com', '3123456789', 'petlab2025'),
('Julián Gómez', 'julian.gomez@gmail.com', '3209876543', 'julianpass'),
('María Fernanda Ríos', 'maria.rios@gmail.com', '3216549870', 'mfrios2025');

-- Tabla Pedidos
INSERT INTO pedidos (usuario_id, fecha, total) VALUES
(1, '2025-05-26 10:30:00', 85000.00), -- Croquetas Premium
(2, '2025-05-26 11:15:00', 105000.00), -- Pelota + Serología
(3, '2025-05-27 09:45:00', 60000.00), -- Bioquímica
(4, '2025-05-27 14:20:00', 33000.00), -- Snacks + cuerda
(5, '2025-05-28 08:50:00', 155000.00); -- Hematología + Rayos X


-- Tabla DETALLES_PEDIDO
INSERT INTO detalles_pedido (pedido_id, producto_id, servicio_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 1, 85000),             -- Croquetas + Hematología
(2, 3, 0, 1, 25000),              -- Arena
(3, 0, 5, 1, 90000),               -- Ayuda diagnóstica
(4, 2, 2, 1, 60000),               -- Pelota + Bioquímica
(5, 5, 3, 2, 67500);                -- Snacks + Serología



-- Tabla productos
INSERT INTO productos (nombre, categoría, descripcion, imagen, precio, características, stock) VALUES
('Croquetas Premium', 'Alimentos', 'Alimento seco para perros adultos.', 
'https://cdn.petlab.com/images/croquetas-premium.jpg', 85000, 'Sabor carne, alto en proteínas', 30),

('Pelota con sonido', 'Juguetes', 'Pelota de goma con sonido para perros medianos.', 
'https://cdn.petlab.com/images/pelota-sonido.jpg', 18000, 'Color rojo, material resistente', 50),

('Arena para gatos', 'Alimentos', 'Arena sanitaria aglutinante, control de olores.', 
'https://cdn.petlab.com/images/arena-gatos.jpg', 25000, 'Sin fragancia, 5kg', 40),

('Cuerda para morder', 'Juguetes', 'Cuerda de algodón trenzada.', 
'https://cdn.petlab.com/images/cuerda-morder.jpg', 15000, 'Apto para razas pequeñas y medianas', 60),

('Snacks dentales', 'Alimentos', 'Galletas para limpieza dental.', 
'https://cdn.petlab.com/images/snacks-dentales.jpg', 12000, 'Con eucalipto, sin colorantes', 100);

-- Tabla servicios
INSERT INTO servicios (nombre, categoría, descripcion, imagen, precio, características, stock, recomendaciones, duración, agenda) VALUES
('Hematología Veterinaria', 'Laboratorio', 'Análisis de sangre para diagnóstico general.', 
'https://cdn.petlab.com/images/hematologia.jpg', 45000, 'Muestra de sangre periférica', 20, 
'Ayuno de 8 horas', '15 minutos', 'Lunes a viernes'),

('Bioquímica', 'Laboratorio', 'Perfil hepático y renal completo.', 
'https://cdn.petlab.com/images/bioquimica.jpg', 60000, 'Incluye glucosa, creatinina, ALT', 15, 
'Ayuno de 12 horas', '20 minutos', 'Lunes a sábado'),

('Serología Veterinaria', 'Laboratorio', 'Detección de anticuerpos infecciosos.', 
'https://cdn.petlab.com/images/serologia.jpg', 70000, 'Pruebas para parvovirus, moquillo', 10, 
'No requiere ayuno', '30 minutos', 'Martes y jueves'),

('Gases Sanguíneos', 'Laboratorio', 'Análisis de gases arteriales.', 
'https://cdn.petlab.com/images/gases-sanguineos.jpg', 65000, 'Arterial o venoso', 8, 
'Ayuno de 4 horas', '25 minutos', 'Lunes y miércoles'),

('Ayudas Diagnósticas Veterinarias', 'Diagnóstico', 'Rayos X y ecografías.', 
'https://cdn.petlab.com/images/ayudas-diagnosticas.jpg', 90000, 'Imagenología básica y avanzada', 5, 
'Con orden médica', '40 minutos', 'Solo sábados');


-- Tabla ventas
INSERT INTO venta (total, metodo_pago_id, pedido_id) VALUES
(170000, 1, 1),
(25000, 2, 2),
(90000, 1, 3),
(60000, 3, 4),
(135000, 1, 5);


-- Tabla Contacto
 INSERT INTO contacto (Nombres, Apellidos, Correo, Teléfono, Tipo_contacto, Mensaje, Usuario_id, producto_contacto_id, servicio_contacto_id, adjunto_id) VALUES
('Laura', 'Martínez', 'laura.contacto@gmail.com', '3001234567', 'Consulta producto', '¿La croqueta es hipoalergénica?', 1, 1, NULL, 1),
('Carlos', 'Ramírez', 'carlos.contacto@gmail.com', '3112345678', 'Consulta servicio', '¿Qué incluye la bioquímica?', 2, NULL, 2, 2),
('Andrea', 'Torres', 'andrea.contacto@gmail.com', '3123456789', 'Reclamo', 'Producto llegó dañado.', 3, 2, NULL, 3),
('Julián', 'Gómez', 'julian.contacto@gmail.com', '3209876543', 'Información', 'Quiero saber cómo agendar diagnóstico.', 4, NULL, 5, 4),
('María', 'Ríos', 'maria.contacto@gmail.com', '3216549870', 'Consulta general', '¿Tienen pruebas para gatos?', 5, NULL, 3, NULL);

-- Tabla Producto consulta
INSERT INTO producto_consulta (Numero_orden, Fecha_compra, contacto_id) VALUES
('ORD001', '2025-05-20', 1),
('ORD002', '2025-05-21', 2),
('ORD003', '2025-05-22', 3),
('ORD004', '2025-05-23', 4),
('ORD005', '2025-05-24', 5);


-- Tabla Servicio consulta
INSERT INTO servicio_consulta (Tipo_servicio, Fecha_servicio, Hora_servicio, Contacto_id) VALUES
('Hematología', '2025-05-25', '09:00:00', 1),
('Bioquímica', '2025-05-26', '10:00:00', 2),
('Serología', '2025-05-27', '11:30:00', 5),
('Diagnóstico', '2025-05-28', '08:00:00', 4),
('Consulta general', '2025-05-29', '14:00:00', 3);
-- Tabla Archivos adjuntos
INSERT INTO archivos_adjuntos (Nombre_adjunto, Tipo, Tamaño, Contact_id) VALUES
('croqueta_info.pdf', 'application/pdf', 120, 1),
('bioquimica_detalles.jpg', 'image/jpeg', 256, 2),
('foto_producto_dañado.png', 'image/png', 512, 3),
('formato_agenda.pdf', 'application/pdf', 200, 4),
('vacunas_gatos.jpg', 'image/jpeg', 300, 5);

















