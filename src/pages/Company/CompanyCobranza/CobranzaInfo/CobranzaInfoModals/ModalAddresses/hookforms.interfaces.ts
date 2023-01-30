import { DirectionType } from "../../../../../../shared/types/direction.type";

export type DirectionFormType = DirectionType & {
  directions: Array<DirectionType>;
};
