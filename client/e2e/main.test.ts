import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

const { email, password } = fakeUser()

test.describe.serial('User creating and managing events and calendars', () => {
  test('User can create a new calendar', async ({ page }) => {
    const permalink = 'calendar' + Math.floor(Math.random() * 1000)
    await loginNewUser(page, { email, password })
    await page.goto('/dashboard')

    await page.getByTestId('createCalendar').click()
    await page.getByRole('textbox', { name: 'calendar name' }).click()
    await page.getByRole('textbox', { name: 'calendar name' }).fill('Work')
    await page.getByRole('textbox', { name: 'calendar permalink' }).click()
    await page.getByRole('textbox', { name: 'calendar permalink' }).fill(permalink)
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.locator('text=Work')).toBeVisible()
  })

  test('User can create and save a new calendar event', async ({ page }) => {
    const permalink = 'workcalendar' + Math.floor(Math.random() * 10000)
    await loginNewUser(page)
    await page.goto('/dashboard')
    await page.getByTestId('createCalendar').click()
    await page.getByRole('textbox', { name: 'calendar name' }).click()
    await page.getByRole('textbox', { name: 'calendar name' }).fill('Work')
    await page.getByRole('textbox', { name: 'calendar permalink' }).click()

    await page.getByRole('textbox', { name: 'calendar permalink' }).fill(permalink)
    await page.getByRole('button', { name: 'Save' }).click()

    await page.getByTestId('viewCalendarEvents').click()

    await page.goto('/calendar/' + permalink + '/event/create')

    await page.getByRole('textbox', { name: 'Enter event title' }).click()
    await page.getByRole('textbox', { name: 'Enter event title' }).fill('Meeting')
    await page.getByRole('textbox', { name: 'Enter event description' }).click()
    await page
      .getByRole('textbox', { name: 'Enter event description' })
      .fill('End of year meeting with the team')
    await page.getByTestId('event-date').click()
    await page.locator('div').filter({ hasText: /^28$/ }).nth(2).click()
    await page.getByRole('spinbutton').click()
    await page.getByTestId('event-type').selectOption('MEETUP')
    await page.getByRole('button', { name: 'Create Event' }).click()

    await page.waitForSelector('[data-testid^="event-title-"]')
    await page.waitForSelector('[data-testid^="event-description-"]')

    const eventTitleTestId = await page.evaluate(() =>
      document.querySelector('[data-testid^="event-title-"]').getAttribute('data-testid')
    )
    const eventDescriptionTestId = await page.evaluate(() =>
      document.querySelector('[data-testid^="event-description-"]').getAttribute('data-testid')
    )

    await expect(page.getByTestId(eventTitleTestId)).toHaveText('Meeting')
    await expect(page.getByTestId(eventDescriptionTestId)).toHaveText(
      'End of year meeting with the team'
    )
  })
})
