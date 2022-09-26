import { main_Members } from "@prisma/client";
import Link from "next/link";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";
import PageRoutes from "../utils/front-end/page-routes";

let firstRender = true;
let cachedMembers: main_Members[] = [];

const AllMembers: FunctionComponent = () => {
  const [allMembers, setAllMembers] = useState<main_Members[]>(cachedMembers);
  const allMembersHtml = allMembers.map((member) => (
    <Fragment key={member.ID}>
      <pre>{JSON.stringify(member, null, 2)}</pre>
      <Link href={PageRoutes.viewMember + member.ID}>
        <button>VIEW</button>
      </Link>
      <span style={{ width: "6px", display: "inline-block" }}></span>
      <Link href={PageRoutes.editMember + member.ID}>
        <button>EDIT</button>
      </Link>
    </Fragment>
  ));

  async function fetchAllMembers() {
    const result = await fetch(ApiRoutes.allMembers, { headers: await authHeader() });
    if (!result.ok) return console.error(await result.text());
    const members = await result.json();
    setAllMembers(members);
    cachedMembers = members;
  }

  useEffect(() => {
    if (firstRender) fetchAllMembers();
    firstRender = false;
  }, []);

  return (
    <>
      <h1>All Members</h1>
      <button onClick={fetchAllMembers}>REFRESH</button>
      {allMembersHtml}
    </>
  );
};

export default AllMembers;
