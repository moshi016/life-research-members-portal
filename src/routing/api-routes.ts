// Make sure these start with forward slash '/' - indicates domain root
const ApiRoutes = {
  allMembers: "/api/all-members",
  allAccounts: "/api/all-accounts",
  allPartners: "/api/all-partners",
  allProducts: "/api/all-products",
  allAuthors: "/api/all-authors",
  allGrants: "/api/all-grants",
  allEvents: "/api/all-events",
  allSources: "/api/all-sources",
  allStatuses: "/api/all-statuses",
  registerAccount: "/api/register-account",
  registerPartner: "/api/register-partner",
  registerProduct: "/api/register-product",
  activeAccount: "/api/active-account",
  activeAccountUpdateLastLogin: "/api/active-account/update-last-login",
  account: (id: number) => "/api/account/" + id,
  publicMemberInfo: (id: number) => "/api/member/" + id + "/public",
  publicPartnerInfo: (id: number) => "/api/partner/" + id + "/public",
  privatePartnerInfo: (id: number) => "/api/partner/" + id + "/private",
  publicProductInfo: (id: number) => "/api/product/" + id + "/public",
  publicGrantInfo: (id: number) => "/api/grant/" + id + "/public",
  privateMemberInfo: (id: number) => "/api/member/" + id + "/private",
  privateProductInfo: (id: number) => "/api/product/" + id + "/private",
  deleteAccount: (id: number) => "/api/delete-account/" + id,
  updateAccountName: (id: number) => "/api/update-account/" + id + "/name",
  updateAccountEmail: (id: number) => "/api/update-account/" + id + "/email",
  updateAccountGrantAdmin: (id: number) => "/api/update-account/" + id + "/grant-admin",
  updateAccountRemoveAdmin: (id: number) => "/api/update-account/" + id + "/remove-admin",
  updateAccountRegisterMember: (id: number) => "/api/update-account/" + id + "/register-member",
  updateAccountDeleteMember: (id: number) => "/api/update-account/" + id + "/delete-member",
  updateMemberPublic: (id: number) => "/api/update-member/" + id + "/public",
  updateMemberPrivate: (id: number) => "/api/update-member/" + id + "/private",
  updateProductPublic: (id: number) => "/api/update-product/" + id + "/public",
  updateProductPrivate: (id: number) => "/api/update-product/" + id + "/private",
  updatePartnerPrivate: (id: number) => "/api/update-partner/" + id + "/private",
  updatePartnerPublic: (id: number) => "/api/update-partner/" + id + "/public",
  updateMemberInsight: (id: number) => "/api/update-member/" + id + "/insight",
  updateKeyword: (id: number) => "/api/update-keyword/" + id,
  registerKeyword: "/api/register-keyword",
  allKeywords: "/api/all-keywords",
  allFaculties: "/api/all-faculties",
  allMemberTypes: "/api/all-member-types",
  allOrgTypes: "/api/all-org-types",
  allOrgScopes: "/api/all-org-scopes",
  allProductTypes: "/api/all-product-types",
  allProductTitles: "/api/all-product-titles",
  allEventTypes: "/api/all-event-types",
  allSupervisions: "/api/all-supervisions",
  allLevels: "/api/all-levels",
} as const;

export default ApiRoutes;
