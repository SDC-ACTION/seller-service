SELECT ps.product_id AS id,
    s.name AS sellername,
    ps.price,
    rp.description,
    do.fee,
    do.min_amount,
    do.days
FROM product_seller AS ps
INNER JOIN seller AS s
  ON ps.seller_id = s.id
INNER JOIN return_policy as rp
  ON s.return_policy = rp.id
INNER JOIN delivery_option AS do
  ON s.delivery_id = do.id
WHERE ps.product_id = 10000000;
