export class Employee {
    id: number;
    firstName: string;
    secondName: string;
    patronymic: string;
    dob: Date;
    /** link to documents */
    documentInfoId: number;
    /** location of the foto */
    photo: string;
    /** link to position description */
    positionId: number;
    /** link to adress  */
    personalAdressId: number;
    /** link to personal info */
    personalContactInfoId: number;
    /** link to family */
    familyInfoId: number;
    /** link to education */
    educationInfoId: number;
    /** link to employment info */
    employmentInfoId: number;

}
