import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class AssociationsInput {

    @ApiProperty({
        description: 'Id des utilisateurs',
        example: "[1,2]",
        type: String,
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'Name of the associations',
        example: "Association1",
        type: String,
    })
    public name: string;
}