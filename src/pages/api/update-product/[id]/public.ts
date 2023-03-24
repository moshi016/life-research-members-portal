import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllProductInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { PrivateProductDBRes } from "../../product/[id]/private";

export type UpdateProductPublicParams = {
  title_en: string;
  title_fr: string;
  publish_date?: string | null;
  all_author?: string;
  doi?: string;
  product_type_id?: number | null;
  note?: string;
};

function updateProduct(
  id: number,
  {
    title_en,
    title_fr,
    publish_date,
    all_author,
    doi,
    product_type_id,
    note,
  }: UpdateProductPublicParams
) {
  return db.product.update({
    where: { id },
    data: {
      title_en,
      title_fr,
      publish_date,
      all_author,
      doi,
      note,
      product_type: product_type_id
        ? { connect: { id: product_type_id } }
        : product_type_id === null
          ? { disconnect: true }
          : undefined,
    },
    select: selectAllProductInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateProductDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Product ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params = req.body as UpdateProductPublicParams;

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this product information.");

    const updated = await updateProduct(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}
