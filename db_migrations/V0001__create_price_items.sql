CREATE TABLE t_p32889388_lesplit_landing_copy.price_items (
  id          SERIAL PRIMARY KEY,
  category    VARCHAR(20) NOT NULL CHECK (category IN ('osb', 'fanera')),
  name        VARCHAR(200) NOT NULL,
  price       INTEGER NOT NULL,
  old_price   INTEGER,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO t_p32889388_lesplit_landing_copy.price_items (category, name, price, old_price, sort_order) VALUES
  ('osb', 'ОСБ-3 9мм (2500×1250)',   890,  960,  1),
  ('osb', 'ОСБ-3 12мм (2500×1250)', 1150, 1250,  2),
  ('osb', 'ОСБ-3 15мм (2500×1250)', 1390, 1490,  3),
  ('osb', 'ОСБ-3 18мм (2500×1250)', 1650, 1790,  4),
  ('osb', 'ОСБ-3 22мм (2500×1250)', 1990, 2150,  5),
  ('fanera', 'Фанера 4мм FK (1525×1525)',   580,  650,  1),
  ('fanera', 'Фанера 6мм FK (1525×1525)',   720,  820,  2),
  ('fanera', 'Фанера 9мм FK (1525×1525)',   980, 1080,  3),
  ('fanera', 'Фанера 12мм ФСФ (1525×1525)',1250, 1380,  4),
  ('fanera', 'Фанера 15мм ФСФ (1525×1525)',1550, 1690,  5),
  ('fanera', 'Фанера 18мм ФСФ (1525×1525)',1840, 2000,  6),
  ('fanera', 'Фанера 21мм ФСФ (1525×1525)',2200, 2380,  7);
