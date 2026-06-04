import { test } from '@playwright/test';
import { UserManagementPage } from '../pages/UserManagementPage';
import { newUser, updatedUser } from '../testdata/userData';

test.describe('User Management', () => {
  let userManagementPage: UserManagementPage;

  test.beforeEach(async ({ page }) => {
    userManagementPage = new UserManagementPage(page);
    await page.goto('/buggyUserManagement/');
  });

  test('should create, view, edit and delete a user', async () => {
    // Create user
    await userManagementPage.createUser(
      newUser.name,
      newUser.email,
      newUser.role,
      newUser.status
    );
    await userManagementPage.expectUserCreated();

    // View user
    await userManagementPage.viewFirstUser();
    await userManagementPage.closeModal();

    // Edit user
    await userManagementPage.editFirstUser();
    await userManagementPage.updateName(updatedUser.name!);
    await userManagementPage.expectUserUpdated();

    // Delete user
    await userManagementPage.deleteFirstUser();
    await userManagementPage.expectUserDeleted();
  });
});