-- 4. Construye las siguientes consultas:
-- • Aquellas usadas para insertar, modificar y eliminar un Customer, Staff y Actor.

-- Customer
INSERT INTO public.customer(
	store_id, first_name, last_name, email, address_id, activebool, create_date, last_update, active)
	VALUES (2, 'Darik', 'Harian', 'darik.harian@icloud.com', 12, true, current_date, current_timestamp, 1);

UPDATE customer SET email = 'darik.harian@alphacorp.cl' WHERE customer_id = 601;

DELETE FROM customer WHERE customer_id = 601;

-- Staff
INSERT INTO public.staff(
	first_name, last_name, address_id, email, store_id, active, username, password)
	VALUES ('Darik', 'Harian', 6, 'darik.harian@icloud.com', 2, true, 'darik', 'Gatc2083' );

UPDATE staff SET email = 'darik.harian@alphacorp.cl' WHERE staff_id = 3;

DELETE FROM staff WHERE staff_id = 3;

-- Actor
INSERT INTO public.actor(
	first_name, last_name, last_update)
	VALUES ('Darik', 'Harian', current_timestamp);

UPDATE actor SET last_update = current_timestamp WHERE actor_id = 201;

DELETE FROM actor WHERE actor_id = 201;

-- • Listar todas las “rental” con los datos del “customer” dado un año y mes.
SELECT rent.rental_id AS "ID Arriendo", rent.rental_date AS "Fecha Arriendo", cust.first_name AS "Nombre", cust.last_name AS "Apellido"
	FROM public.rental rent
	JOIN public.customer cust ON rent.customer_id = cust.customer_id
	WHERE EXTRACT(YEAR FROM rent.rental_date) = 2006
	AND EXTRACT(MONTH FROM rent.rental_date) = 02;

-- • Listar Número, Fecha (payment_date) y Total (amount) de todas las “payment”.
SELECT payment_id AS "ID Pago", payment_date AS "Fecha De Pago", amount AS "Total"
	FROM public.payment

-- • Listar todas las “film” del año 2006 que contengan un (rental_rate) mayor a 4.0.
SELECT * FROM public.film WHERE release_year = 2006 AND rental_rate >= 4.0;

-- 5. Realiza un Diccionario de datos que contenga el nombre de las tablas y columnas, si éstas pueden ser nulas, y su tipo de dato correspondiente.
-- Archivo diccionario.csv

WITH vars
AS (
  SELECT 
    'public'     AS v_SchemaName  
  , 'NO'         AS v_TablesOnly  
)

, baseTbl
AS (
  SELECT table_schema AS SchemaName
  , table_catalog
  , table_type, table_name, table_schema
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = (SELECT v_SchemaName FROM vars) 
    AND (    (TABLE_TYPE = 'BASE TABLE')
	     OR  ((SELECT v_TablesOnly FROM vars) = 'NO')  
	    )
)

, metadata
AS (
	SELECT
	  bt.SchemaName     AS schema_nm
	, bt.table_name     AS table_nm
	, CASE WHEN bt.TABLE_TYPE = 'BASE TABLE' THEN 'TBL'
	       WHEN bt.TABLE_TYPE = 'VIEW'  THEN 'VW'
	       ELSE 'UK'
	  END AS obj_typ
	, tut.ordinal_position   AS ord_pos
	, tut.column_name        AS column_nm 
    , CONCAT(COALESCE(tut.data_type, 'unknown'), 
      CASE WHEN tut.data_type IN('varchar','char')        THEN CONCAT('(', CAST(tut.CHARACTER_MAXIMUM_LENGTH AS varchar(10)), ')')
	       WHEN tut.data_type IN('date','time')           THEN CONCAT('(3)')
	       WHEN tut.data_type = 'datetime'                THEN CONCAT('(8)')
	       WHEN tut.data_type = 'timestamp'               THEN CONCAT('(4)')
	       WHEN tut.data_type in('bigint','integer','smallint') THEN CONCAT('(', CAST(tut.NUMERIC_PRECISION AS varchar(10)), ')')
	       WHEN tut.data_type = 'decimal'                 THEN CONCAT('(', CAST(tut.NUMERIC_PRECISION AS varchar(10)), ',', CAST(tut.NUMERIC_SCALE AS varchar(10)), ')')
	       WHEN tut.CHARACTER_MAXIMUM_LENGTH IS NOT NULL  THEN CONCAT('(', CAST(tut.CHARACTER_MAXIMUM_LENGTH AS varchar(10)), ')')
		   WHEN tut.DATETIME_PRECISION IS NOT NULL        THEN CONCAT('(', CAST(tut.DATETIME_PRECISION AS varchar(10)), ')')
	       WHEN tut.NUMERIC_PRECISION IS NOT NULL
		    AND tut.NUMERIC_SCALE     IS NULL             THEN CONCAT('(', CAST(tut.NUMERIC_PRECISION AS varchar(10)), ')')
	       WHEN tut.NUMERIC_PRECISION IS NOT NULL
	        AND tut.NUMERIC_SCALE     IS NOT NULL         THEN CONCAT('(', CAST(tut.NUMERIC_PRECISION AS varchar(10)), ',', CAST(tut.NUMERIC_SCALE AS varchar(10)), ')')
		   ELSE ''
    END ) AS data_typ 
  , CASE WHEN tut.IS_NULLABLE = 'YES' THEN 'NULL' ELSE 'NOT NULL' END AS nullable
  FROM       INFORMATION_SCHEMA.COLUMNS tut
  INNER JOIN baseTbl                    bt  ON bt.table_catalog = tut.TABLE_CATALOG AND bt.table_name = tut.table_name
)

, meta_for_keys
AS (
  SELECT schema_nm, table_nm, column_nm
  , STRING_AGG(is_key, ',' ORDER BY is_key) AS is_key
  FROM (
    SELECT cons.TABLE_SCHEMA AS schema_nm
    , cons.TABLE_NAME        AS table_nm
    , kcu.COLUMN_NAME        AS column_nm
    , CASE WHEN cons.constraint_type = 'PRIMARY KEY' THEN 'PK'
           WHEN cons.constraint_type = 'UNIQUE'      THEN 'UK'
           WHEN cons.constraint_type = 'FOREIGN KEY' THEN 'FK'
	       ELSE 'X'
      END AS is_key
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS      cons 
    INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
       ON cons.TABLE_SCHEMA = kcu.TABLE_SCHEMA  
      AND cons.TABLE_NAME = kcu.TABLE_NAME
  	  AND cons.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
    WHERE cons.table_schema = (SELECT v_SchemaName FROM vars) 
      AND cons.table_name IN(SELECT DISTINCT table_name FROM baseTbl)
      AND cons.constraint_type IN('PRIMARY KEY','FOREIGN KEY','UNIQUE') 
    GROUP BY cons.TABLE_SCHEMA, cons.TABLE_NAME, kcu.COLUMN_NAME, cons.constraint_type
  ) t
  GROUP BY schema_nm, table_nm, column_nm
)

, col_comm
AS (
	SELECT c.TABLE_SCHEMA AS schema_nm
	, c.TABLE_NAME        AS table_nm
	, c.COLUMN_NAME       AS column_nm
	, pgd.DESCRIPTION     AS column_descr
	FROM pg_catalog.pg_statio_all_tables   AS st
	INNER JOIN pg_catalog.PG_DESCRIPTION   AS pgd ON pgd.objoid = st.relid
	INNER JOIN INFORMATION_SCHEMA.COLUMNS  AS c   ON pgd.objsubid = c.ordinal_position
	                                             AND c.table_schema = st.schemaname
	                                             AND c.table_name = st.relname
	WHERE c.table_schema = (SELECT v_SchemaName FROM vars) 
	  AND c.table_name IN(SELECT DISTINCT table_name FROM baseTbl)
)

SELECT md.SCHEMA_NM, md.TABLE_NM, md.OBJ_TYP
, md.ORD_POS AS ord
, COALESCE(pk.is_key, ' ') AS is_key
, md.COLUMN_NM, md.DATA_TYP, md.NULLABLE, c.column_descr 
FROM      metadata      md
LEFT JOIN meta_for_keys pk ON pk.SCHEMA_NM = md.SCHEMA_NM AND pk.TABLE_NM = md.TABLE_NM AND pk.COLUMN_NM = md.COLUMN_NM
LEFT JOIN col_comm      c  ON c.SCHEMA_NM  = md.SCHEMA_NM AND c.TABLE_NM  = md.TABLE_NM AND c.COLUMN_NM  = md.COLUMN_NM
ORDER BY md.SCHEMA_NM, md.TABLE_NM, md.ORD_POS