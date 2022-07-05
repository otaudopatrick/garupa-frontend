export class CompareFieldsValidation {

  validate (field: string, fieldToCompare: string): string| null {
    return (field !== "" && fieldToCompare !== "") && (field !== fieldToCompare ) ? "Valor inválido" : null
  }
}