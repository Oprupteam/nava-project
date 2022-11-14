export interface Section {
    sectionId?: number;
    sectionName: string;
    deleteFlag: number;
    department:{
        departmentId: string
    },
    employee:{
      employeeId: string
    }
}
