export interface TestNestedNested1 {
  nestedNestedProp1: string;
}

export interface TestNested1 {
  nestedProp1: string;
  nestedProp2: number;
  nestedProp3: TestNestedNested1;
}

export interface Test1 {
  prop1: string;
  prop12?: string;
  prop2: number;
  prop22?: number;
  prop3: boolean;
  prop32?: boolean;
  prop4: TestNested1;
}