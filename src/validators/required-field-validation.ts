export class RequiredFieldValidation {
  validate (field:string ): string| null {
    return field !== "" ? null : `Campo obrigatório`
  }
}