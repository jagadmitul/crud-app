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
    extension: [
      {
        url: "payer name",
        valueString: "Fidelis"
      }
    ],
    identifier: [
      {
        system: "http://hl7.org/fhir/sid/us-npi",
        value: "1234567890"
      }
    ],
    active: true,
    name: [
      {
        family: "Last",
        given: [
          "First"
        ]
      }
    ],
    telecom: [
      {
        system: "email"
      },
      {
        system: "phone"
      }
    ],
    gender: "male",
    birthDate: "1969-12-09"
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
    extension: [
      {
        url: "payer name",
        valueString: "Fidelis"
      }
    ],
    identifier: [
      {
        system: "http://hl7.org/fhir/sid/us-npi",
        value: "1234567890"
      }
    ],
    active: true,
    name: [
      {
        family: "Last",
        given: [
          "First"
        ]
      }
    ],
    telecom: [
      {
        system: "email"
      },
      {
        system: "phone"
      }
    ],
    gender: "male",
    birthDate: "1969-12-09"
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
