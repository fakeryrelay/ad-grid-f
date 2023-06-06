DROP TABLE IF EXISTS shops CASCADE;
DROP TABLE IF EXISTS workers CASCADE;
DROP FUNCTION IF EXISTS get_full_name;

CREATE FUNCTION get_full_name(OUT full_name text) AS $$
DECLARE
	first_name text ARRAY := ARRAY['Даниил','Дмитрий','Иван','Кирилл','Никита','Михаил','Егор','Матвей','Андрей','Илья','Алексей','Роман','Сергей','Владислав','Ярослав','Тимофей','Арсений','Денис','Владимир','Павел'];
	last_name text ARRAY := ARRAY['Иванов','Смирнов','Кузнецов','Попов','Васильев','Петров','Соколов','Михайлов','Новиков','Федоров','Морозов','Волков','Алексеев','Лебедев','Семенов','Егоров','Павлов','Козлов','Степанов','Николаев'];
BEGIN
	full_name := last_name[trunc(random() * 19 + 1)] || ' ' || first_name[trunc(random() * 19 + 1)] ;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE shops (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
	total_revenue NUMERIC NOT NULL,
	open_date DATE NOT NULL,
	area INT NOT NULL
);


INSERT INTO shops (name, total_revenue, open_date, area) 
	VALUES 
		(
			'Магазин ' || generate_series(1, 100),
			trunc(random() * 500000 + 1000000) + trunc(random() * 100) / 100,
			date((current_date - '15 years'::interval) +
				trunc(random() * 365) * '1 day'::interval +
				trunc(random() * 14) * '1 year'::interval ),
			trunc(random() * 500 + 200)
		);
			
CREATE TABLE workers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
	salary NUMERIC NOT NULL,
	hire_date DATE NOT NULL,
	performance INT NOT NULL,
	shop_id BIGINT NOT NULL,
	CONSTRAINT workers_shop_id_fkey
		FOREIGN KEY(shop_id)
		REFERENCES shops(id)
);
		
DO $$
DECLARE 
_id int :=0;
BEGIN
	WHILE _id < 10000 LOOP
		INSERT INTO workers (name, salary, hire_date, performance, shop_id) 
			VALUES 
				(
					get_full_name(),
					trunc(random() * 100000 + 50000) + trunc(random() * 100) / 100,
					date((current_date - '15 years'::interval) +
						trunc(random() * 365) * '1 day'::interval +
						trunc(random() * 14) * '1 year'::interval ),
					trunc(random() * 100),
					trunc(random() * 100 + 1)
				);
	_id := _id+1;
	END LOOP;
END $$;

DROP FUNCTION IF EXISTS get_full_name;

SELECT * FROM workers;

