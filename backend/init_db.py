import os
import urllib.parse
from sqlalchemy import create_engine, text

env_path = os.path.join(os.path.dirname(__file__), '.env')
try:
    from dotenv import load_dotenv
    load_dotenv(env_path)
except ImportError:
    pass

def get_database_url():
    db_url = os.environ.get("DATABASE_URL", "").strip()
    if not db_url:
        print("\n" + "="*60)
        print("[!] AVISO: 'DATABASE_URL' esta vacia en backend/.env")
        print("="*60)
        print("1. Abre el archivo: c:\\nuevo\\fori\\backend\\.env")
        print("2. Pega tu URL de Neon o Supabase en la linea 7:")
        print("   DATABASE_URL=postgresql://usuario:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require")
        print("3. Guarda el archivo con Ctrl + S y vuelve a ejecutar este script.")
        print("="*60 + "\n")
        return None
    elif db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    return db_url

def init_database():
    url = get_database_url()
    if not url:
        return
    print(f"Conectando a la base de datos...")
    engine = create_engine(url)

    schema_sql = """
    -- 1. Tabla de usuarios
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    -- 2. Tabla de administradores
    CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        nombre VARCHAR(150),
        activo BOOLEAN DEFAULT TRUE
    );

    -- 3. Tabla de categorías de flores
    CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion TEXT
    );

    -- 4. Tabla de flores
    CREATE TABLE IF NOT EXISTS flores (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
        precio NUMERIC(10, 2) NOT NULL,
        stock INT DEFAULT 10,
        imagen_url TEXT,
        imagenes_extra JSONB DEFAULT '[]'::jsonb,
        descripcion_detallada TEXT,
        sku VARCHAR(50) UNIQUE,
        tags VARCHAR(200),
        recomendaciones TEXT
    );

    -- 5. Tabla de categorías de accesorios
    CREATE TABLE IF NOT EXISTS accesorios_categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        icono VARCHAR(50)
    );

    -- 6. Tabla de accesorios
    CREATE TABLE IF NOT EXISTS accesorios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        categoria_id INT REFERENCES accesorios_categorias(id) ON DELETE SET NULL,
        precio NUMERIC(10, 2) NOT NULL,
        stock INT DEFAULT 10,
        imagen_data TEXT,
        descripcion TEXT,
        sku VARCHAR(50)
    );

    -- 7. Tabla de direcciones
    CREATE TABLE IF NOT EXISTS direcciones (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        calle VARCHAR(200) NOT NULL,
        sin_numero BOOLEAN DEFAULT FALSE,
        codigo_postal VARCHAR(10),
        estado VARCHAR(100),
        municipio VARCHAR(100),
        localidad VARCHAR(100),
        colonia VARCHAR(100),
        num_interior VARCHAR(20),
        indicaciones VARCHAR(128),
        tipo_domicilio VARCHAR(20) DEFAULT 'residencial',
        nombre_contacto VARCHAR(150),
        telefono_contacto VARCHAR(20),
        es_principal BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_direcciones_user ON direcciones(user_id);

    -- 8. Carrito y Carrito Items
    CREATE TABLE IF NOT EXISTS carrito (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS carrito_items (
        id SERIAL PRIMARY KEY,
        carrito_id INT NOT NULL REFERENCES carrito(id) ON DELETE CASCADE,
        flor_id INT REFERENCES flores(id) ON DELETE CASCADE,
        accesorio_id INT REFERENCES accesorios(id) ON DELETE CASCADE,
        cantidad INT DEFAULT 1,
        added_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 9. Pedidos y Vistas
    CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        fecha_pedido TIMESTAMPTZ DEFAULT NOW(),
        total NUMERIC(10, 2) DEFAULT 0.0,
        estado VARCHAR(50) DEFAULT 'pendiente',
        cliente_nombre VARCHAR(150),
        direccion_entrega TEXT
    );

    CREATE OR REPLACE VIEW vista_pedidos AS
    SELECT 
        p.id, 
        p.user_id, 
        p.fecha_pedido, 
        p.total, 
        p.estado, 
        COALESCE(u.email, 'Cliente Anónimo') AS cliente_email,
        p.cliente_nombre,
        p.direccion_entrega
    FROM pedidos p
    LEFT JOIN users u ON p.user_id = u.id;

    CREATE OR REPLACE VIEW resumen_ventas_diario AS
    SELECT 
        DATE(fecha_pedido) AS dia,
        COUNT(id) AS total_pedidos,
        COALESCE(SUM(total), 0) AS total_ventas
    FROM pedidos
    GROUP BY DATE(fecha_pedido)
    ORDER BY dia DESC;
    """

    with engine.begin() as conn:
        print("Creando tablas, vistas y relaciones...")
        conn.execute(text(schema_sql))

        # Insertar categorías por defecto si está vacía
        cat_count = conn.execute(text("SELECT COUNT(*) FROM categorias")).scalar()
        if cat_count == 0:
            print("Insertando categorías de flores predeterminadas...")
            conn.execute(text("""
                INSERT INTO categorias (nombre, descripcion) VALUES
                ('Rosas', 'Elegantes rosas frescas de invernadero en diversas tonalidades.'),
                ('Tulipanes', 'Tulipanes importados de la más alta calidad y frescura.'),
                ('Girasoles', 'Girasoles radiantes llenos de energía y color.'),
                ('Orquídeas', 'Orquídeas exóticas y delicadas ideales para regalo.'),
                ('Silvestres', 'Variedad de flores campestres y aromáticas.'),
                ('Mixtas', 'Arreglos combinados para cualquier ocasión.')
                ON CONFLICT (nombre) DO NOTHING;
            """))

        # Insertar flores de muestra si la tabla está vacía
        flores_count = conn.execute(text("SELECT COUNT(*) FROM flores")).scalar()
        if flores_count == 0:
            print("Insertando flores de muestra en el catálogo...")
            conn.execute(text("""
                INSERT INTO flores (nombre, categoria_id, precio, stock, descripcion_detallada, sku) VALUES
                ('Ramo de 12 Rosas Rojas', 1, 450.00, 25, 'Clásico ramo de 12 rosas rojas aterciopeladas con follaje fino.', 'ROS-001'),
                ('Bouquet Dulce Romance', 2, 580.00, 15, 'Arreglo de tulipanes rosados y blancos con papel importado.', 'TUL-001'),
                ('Girasoles Radiantes', 3, 380.00, 20, 'Trío de girasoles con follaje verde fresco y envoltura de yute.', 'GIR-001'),
                ('Orquídea Phalaenopsis Blanca', 4, 850.00, 10, 'Hermosa orquídea en maceta de cerámica blanca con sustrato nutritivo.', 'ORQ-001')
            """))

    print("¡Base de datos PostgreSQL inicializada exitosamente!")

if __name__ == "__main__":
    init_database()
