const API_URL = "https://jsonplaceholder.typicode.com/todos";
const TOKEN = "";

export const fetchItems = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await fetch(API_URL, options);
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
        system: "http://hl7.org/fhir/sid/us-npi"
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
        system: "email",
        value: item.email,
      },
      {
        system: "phone",
        value: item.phone_number,
      },
    ],
    gender: item.gender,
    birthDate: item.birthDate,
  });

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
        system: "http://hl7.org/fhir/sid/us-npi",
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
        system: "email",
        value: item.email,
      },
      {
        system: "phone",
        value: item.phone_number,
      },
    ],
    gender: item.gender,
    birthDate: item.birthDate,
  });

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response.json();
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.json();
};
