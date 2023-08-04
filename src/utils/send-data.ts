/* eslint-disable no-console */
interface SendDataProps {
  url: string;
  body?: any;
  toastMessage?: string;
  method?: 'POST' | 'PUT' | 'DELETE';
  operation?: 'Add' | 'Update' | 'delete';
  showToast?: boolean;
  headers?: any;
  responseWaitTimeMs?: number;
}
const operationNotificationString = {
  Add: 'Created successfully',
  Update: 'Updated successfully',
  delete: 'Deleted successfully',
};
export const sendData = async (props: SendDataProps) => {
  const {
    url,
    body,
    method = 'PUT',
    operation = 'Update',
    toastMessage,
    showToast = true,
    headers,
    responseWaitTimeMs = 1000 * 60 * 2, // 2 minutes
  } = props;
  // const session = await getSession();

  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    // Authorization: session?.userToken ? `Bearer ${session?.userToken}` : '',
    // 'x-organization-id': session?.organization_code ?? '',
    ...headers,
  });

  // const controller = new AbortController();
  // const timer = setTimeout(() => controller.abort(), responseWaitTimeMs);

  let responseData = await fetch(url, {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(body),
    // signal: controller.signal,
  })
    .then(response => {
      if (response.status === 200) {
        console.log('response', response);
        if (showToast) {
          //   toastMessage
          //     ? toastMessage
          //     : toast.success(operationNotificationString[operation]);
        }
      }
      if (response.status === 403) {
        if (showToast) {
          //   toast.error('You are not authorized to perform this action');
        }
        console.error(response);
      }
      if (response.status === 400) {
        if (showToast) {
          //   toast.error(
          //     `Data entered is invalid or a required field is missing ${response.text}`,
          //   );
        }
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
      // toast.error(`Operation failed ${error}`);
    });
  // clearTimeout(timer);

  return responseData;
};
