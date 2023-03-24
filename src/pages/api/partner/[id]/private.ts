import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllPartnerInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";

export type PrivatePartnerRes = Awaited<ReturnType<typeof getPrivatePartnerInfo>>;

function getPrivatePartnerInfo(id: number) {
  return db.organization.findUnique({
    where: { id },
    select: selectAllPartnerInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivatePartnerRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Partner ID is required.");

  try {

    const id = parseInt(req.query.id);
    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const authorized =
      currentAccount.is_admin || (currentAccount.member && currentAccount.member.id === id);

    if (!authorized)
      return res
        .status(401)
        .send("You are not authorized to view this partner's private information.");

    const partner = await getPrivatePartnerInfo(id);
    if (!partner) return res.status(400).send("Partner not found. ID: " + id);

    return res.status(200).send(partner);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}
