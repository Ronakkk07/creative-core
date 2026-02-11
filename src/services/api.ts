export const API_BASE_URL = "https://portfolio-backend-9r7n.onrender.com/api";

export async function fetchHeroData() {
  const res = await fetch(`${API_BASE_URL}/hero/`);
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/hero/`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchExperience() {
  const res = await fetch(`${API_BASE_URL}/experience/`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function fetchContactInfo() {
  const res = await fetch(`${API_BASE_URL}/contact/info/`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function sendContactMessage(data: any) {
  const res = await fetch(`${API_BASE_URL}/contact/message/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE_URL}/skills/`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function fetchAbout() {
  const res = await fetch(`${API_BASE_URL}/about/`);
  if (!res.ok) throw new Error("Failed to fetch about");
  return res.json();
}

