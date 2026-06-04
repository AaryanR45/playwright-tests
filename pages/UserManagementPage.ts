import { Page, Locator, expect } from '@playwright/test';

export class UserManagementPage {
  readonly page: Page;

  // Buttons
  readonly addUserButton: Locator;
  readonly createUserButton: Locator;
  readonly saveChangesButton: Locator;
  readonly closeButton: Locator;

  // Form fields
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly roleSelect: Locator;
  readonly statusSelect: Locator;

  // Toast messages
  readonly userCreatedToast: Locator;
  readonly userUpdatedToast: Locator;
  readonly userDeletedToast: Locator;

  // Delete modal confirm button
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addUserButton = page.getByRole('button', { name: '＋ Add User' });
    this.createUserButton = page.getByRole('button', { name: 'Create User' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.closeButton = page.getByRole('button', { name: 'Close' });

    this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.roleSelect = page.getByLabel('Role');
    this.statusSelect = page.getByLabel('Status');

    this.userCreatedToast = page.getByText('✓ User created successfully');
    this.userUpdatedToast = page.getByText('✓ User updated successfully');
    this.userDeletedToast = page.getByText('✓ User deleted');

    this.confirmDeleteButton = page.locator('.modal-actions > .btn.btn-danger');
  }

  async openAddUserForm(): Promise<void> {
    await this.addUserButton.click();
  }

  async fillUserForm(name: string, email: string, role: string, status: string): Promise<void> {
    await this.fullNameInput.click();
    await this.fullNameInput.fill(name);
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.roleSelect.selectOption(role);
    await this.statusSelect.selectOption(status);
  }

  async submitCreateUser(): Promise<void> {
    await this.createUserButton.click();
  }

  async createUser(name: string, email: string, role: string, status: string): Promise<void> {
    await this.openAddUserForm();
    await this.fillUserForm(name, email, role, status);
    await this.submitCreateUser();
  }

  async viewFirstUser(): Promise<void> {
    await this.page.getByRole('button', { name: 'View' }).first().click();
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }

  async editFirstUser(): Promise<void> {
    await this.page.getByRole('button', { name: 'Edit' }).first().click();
  }

  async updateName(newName: string): Promise<void> {
    await this.fullNameInput.click();
    await this.fullNameInput.fill(newName);
    await this.saveChangesButton.click();
  }

  async deleteFirstUser(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete' }).first().click();
    await this.confirmDeleteButton.click();
  }

  async expectUserCreated(): Promise<void> {
    await expect(this.userCreatedToast).toBeVisible();
  }

  async expectUserUpdated(): Promise<void> {
    await expect(this.userUpdatedToast).toBeVisible();
  }

  async expectUserDeleted(): Promise<void> {
    await expect(this.userDeletedToast).toBeVisible();
  }
}