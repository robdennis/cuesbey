from __future__ import absolute_import

from logging_unterpolation import patch_logging
patch_logging()

import logging
import inspect

class AutoLogger(object):
    """
    A logger proxy object, with all of the methods and attributes of C{Logger}.

    When an attribute (e.g., "debug") is requested, inspects the stack for the
    calling module's name, and passes that name to C{logging.getLogger}.

    What this means is that you can instantiate an C{AutoLogger} anywhere, and
    when you call it, the log entry shows the module where you called it, not
    where it was created.

    C{AutoLogger} also inspects the local variables where it is called, looking
    for C{self}. If C{self} exists, its classname is added to the module name.
    """
    def __getattr__(self, name):
        if 'self' in inspect.currentframe(1).f_locals:
            other = inspect.currentframe(1).f_locals['self']
            caller_name = '%s.%s'%(other.__class__.__module__,
                                   other.__class__.__name__)
        else:
            caller_name = inspect.currentframe(1).f_globals['__name__']
        logger = logging.getLogger(caller_name)
        return getattr(logger, name)

log = AutoLogger()


def log_exceptions(fn):
    """ A decorator designed to wrap a function and log any exception
that method produces.

    The exception will still be raised after being logged.

    Also logs (at the trace level) the arguments to every call.

    Currently this is only designed for module-level functions.  Not
sure what happens if a method is decorated
    with this (since logger is resolved from module name).
    """
    def wrapper(*args, **kwargs):
        try:
            a = args or []
            a = [str(x)[:255] for x in a]
            kw = kwargs or {}
            kw = dict([(str(k)[:255], str(v)[:255]) for k, v in kw.iteritems()])
            log.debug('Calling %s.%s %r %r' % (fn.__module__,
                                               fn.__name__, a, kw))
            return fn(*args, **kwargs)
        except Exception, e:
            log.error("Error calling function %s: %s" % (fn.__name__, e))
            log.exception(e)
            raise
    wrapper.__name__ = fn.__name__
    return wrapper