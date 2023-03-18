import { PersonalDetail } from './personal-detail/pesonal-detail';
import { Review } from './review';
import { UserDetail } from './user-detail/user-detail';

export function displayForm<T>(currentStep: T) {
  switch (currentStep) {
    case 1:
      return <UserDetail />;
    case 2:
      return <PersonalDetail />;
    case 3:
      return <Review />;
  }
}
