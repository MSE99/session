'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const fastifyCookie = require('fastify-cookie')
const fastifySession = require('..')

test('register should fail if no secret is specified', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = {}
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.ok(err instanceof Error)
    t.end()
  })
})

test('register should succeed if valid secret is specified', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = { secret: 'cNaoPYAwF60HZJzkcNaoPYAwF60HZJzk' }
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.notOk(err)
    t.end()
  })
})

test('register should fail if the secret is too short', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = { secret: 'geheim' }
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.ok(err instanceof Error)
    t.end()
  })
})

test('register should succeed if secret is short, but in an array', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = { secret: ['geheim'] }
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.notOk(err)
    t.end()
  })
})

test('register should succeed if multiple secrets are present', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = { secret: ['geheim', 'test'] }
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.notOk(err)
    t.end()
  })
})

test('register should fail if no secret is present in array', t => {
  t.plan(1)
  const fastify = Fastify()

  const options = { secret: [] }
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, options)
  fastify.ready((err) => {
    t.ok(err instanceof Error)
    t.end()
  })
})
