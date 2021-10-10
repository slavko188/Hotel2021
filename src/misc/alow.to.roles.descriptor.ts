import { SetMetadata } from "@nestjs/common"

export const AllowToRoles = (...roles: ("administrator" | "user")[]) => {  // (...roles:)->raspakovane role
 return SetMetadata("allow_to_roles", roles);

};