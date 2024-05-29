export const fetchItems = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  };
  const response = await fetch(import.meta.env.VITE_API_URL, options);
  const data = await response.json();
  return data.entry.map((item: any) => item.resource);
};

export const addItem = async (item: any) => {
  const body = JSON.stringify({
    resourceType: "Practitioner",
    extension: [
      {
        url: "payer name",
        valueString: item.payer,
      },
    ],
    identifier: [
      {
        system: "http://h17.org/fhir/sid/us-npi"
      },
    ],
    active: item.active,
    name: [
      {
        family: item.last_name,
        given: [item.first_name],
      },
    ],
    telecom: [
      {
        system: "phone",
        value: item.phone_number,
      },
    ]
  });

  const response = await fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response.json();
};

export const updateItem = async (id: number, item: any) => {
  const body = JSON.stringify({
    resourceType: "Practitioner",
    extension: [
      {
        url: "payer name",
        valueString: item.payer,
      },
    ],
    identifier: [
      {
        system: "http://h17.org/fhir/sid/us-npi",
        value: item.practitioner_id,
      },
    ],
    active: item.active,
    id: id,
    name: [
      {
        family: item.last_name,
        given: [item.first_name],
      },
    ],
    telecom: [
      {
        system: "phone",
        value: item.phone_number,
      },
    ]
  });

  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response.json();
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
  return response.json();
};
