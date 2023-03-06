import { FormHeading } from '@/shared/form';
import { PersonalDetail } from '../personal-detail/pesonal-detail';
import { UserDetail } from '../user-detail/user-detail';

export function Review() {
  return (
    <>
      <FormHeading>Review</FormHeading>
      <UserDetail />
      <PersonalDetail />{' '}
    </>
  );
}
