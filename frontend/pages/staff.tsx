import Metadata from "@components/staff/Metadata";
import { StaffForm } from "@jamalsoueidan/bsf.bsf-pkg";
import { useStaff, useStaffUpdate } from "@services/staff";
import { useCallback } from "react";

export default () => {
  const { data: staff } = useStaff();
  const { update } = useStaffUpdate();

  const submit = useCallback(
    async (fieldValues: unknown) => {
      await update(fieldValues);
    },
    [update],
  );

  if (!staff) {
    return <></>;
  }

  return (
    <StaffForm
      data={staff}
      action={submit}
      titleMetadata={<Metadata active={staff.active} />}
      disallowEditing={{ group: false, active: false }}
    ></StaffForm>
  );
};
